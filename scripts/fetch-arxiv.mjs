import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const ENDPOINT = 'https://export.arxiv.org/api/query';
const SEARCH_QUERY =
  '(cat:cs.RO OR cat:cs.AI OR cat:cs.CV OR cat:cs.LG) AND (all:"world action model" OR all:"vision language action" OR all:"robot world model" OR (all:"world model" AND all:robot))';
const OUTPUT_PATH = resolve(process.cwd(), 'data', 'arxiv', 'papers.json');
const MAX_RESULTS = readNumberArgument('--max-results', 60);
const POOL_LIMIT = readNumberArgument('--pool-limit', 24);
const MIN_RELEVANCE = readNumberArgument('--min-relevance', 7);
const FETCH_ATTEMPTS = readNumberArgument('--fetch-attempts', 4);
const RETRYABLE_STATUS = new Set([408, 425, 429]);

function readNumberArgument(name, fallback) {
  const prefix = `${name}=`;
  const argument = process.argv.find((value) => value.startsWith(prefix));
  if (!argument) return fallback;
  const parsed = Number(argument.slice(prefix.length));
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return parsed;
}

function normalizeText(value = '') {
  return decodeXml(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function decodeXml(value) {
  const named = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
  };
  return value
    .replace(/&(amp|lt|gt|quot|apos);/g, (entity) => named[entity])
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function retryDelay(response, attempt) {
  const retryAfter = Number(response?.headers.get('retry-after'));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Math.min(retryAfter * 1_000, 30_000);
  }
  return Math.min(5_000 * 2 ** (attempt - 1), 30_000);
}

async function fetchFeed(url) {
  let lastError;

  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    let response;

    try {
      response = await fetch(url, {
        headers: {
          Accept: 'application/atom+xml',
          'User-Agent': 'RoboOpus-WAM/0.2 (https://github.com/RoboOpus/wam)',
        },
        signal: AbortSignal.timeout(45_000),
      });
    } catch (error) {
      lastError = error;
    }

    if (response?.ok) return response.text();

    if (response) {
      const retryable = RETRYABLE_STATUS.has(response.status) || response.status >= 500;
      const error = new Error(`arXiv API returned ${response.status} ${response.statusText}.`);
      if (!retryable) throw error;
      lastError = error;
    }

    if (attempt === FETCH_ATTEMPTS) break;

    const delay = retryDelay(response, attempt);
    console.warn(
      `arXiv request attempt ${attempt}/${FETCH_ATTEMPTS} failed; retrying in ${delay / 1_000}s.`,
    );
    await new Promise((resolveDelay) => setTimeout(resolveDelay, delay));
  }

  throw new Error(
    `arXiv request failed after ${FETCH_ATTEMPTS} attempts: ${lastError?.message ?? 'unknown error'}`,
  );
}

function tag(entry, name) {
  const match = entry.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return normalizeText(match?.[1] ?? '');
}

function attribute(fragment, name) {
  const match = fragment.match(new RegExp(`${name}=["']([^"']+)["']`, 'i'));
  return decodeXml(match?.[1] ?? '');
}

function parseEntries(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => {
    const entry = match[1];
    const idUrl = tag(entry, 'id').replace('http://', 'https://');
    const id = idUrl.replace(/^https:\/\/arxiv\.org\/abs\//, '').replace(/v\d+$/, '');
    const authors = [...entry.matchAll(/<author>([\s\S]*?)<\/author>/gi)]
      .map((author) => tag(author[1], 'name'))
      .filter(Boolean);
    const categories = [...entry.matchAll(/<category\b([^>]*)\/?\s*>/gi)]
      .map((category) => attribute(category[1], 'term'))
      .filter(Boolean);
    const links = [...entry.matchAll(/<link\b([^>]*)\/?\s*>/gi)].map((link) => ({
      href: attribute(link[1], 'href').replace('http://', 'https://'),
      rel: attribute(link[1], 'rel'),
      type: attribute(link[1], 'type'),
      title: attribute(link[1], 'title'),
    }));

    return {
      id,
      title: tag(entry, 'title'),
      abstract: tag(entry, 'summary'),
      authors,
      published: tag(entry, 'published'),
      updated: tag(entry, 'updated'),
      primaryCategory:
        attribute(entry.match(/<arxiv:primary_category\b([^>]*)\/?\s*>/i)?.[1] ?? '', 'term') ||
        categories[0] ||
        'unknown',
      categories,
      url: links.find((link) => link.rel === 'alternate')?.href || idUrl,
      pdfUrl:
        links.find((link) => link.title === 'pdf' || link.type === 'application/pdf')?.href ||
        `https://arxiv.org/pdf/${id}`,
    };
  });
}

const relevanceRules = [
  { label: 'world action model', expression: /world[- ]action models?/i, title: 12, abstract: 6 },
  { label: 'vision-language-action', expression: /vision[- ]language[- ]action|\bVLA\b/i, title: 9, abstract: 4 },
  { label: 'robot world model', expression: /robot(?:ic)?\s+world model|world model.{0,28}robot/i, title: 9, abstract: 5 },
  { label: 'video world model', expression: /video\s+world model|world model.{0,28}video/i, title: 6, abstract: 3 },
  { label: 'manipulation', expression: /manipulation|dexterous|bimanual/i, title: 4, abstract: 2 },
  { label: 'embodied', expression: /embodied|robot learning/i, title: 3, abstract: 2 },
  { label: 'action generation', expression: /action (?:generation|prediction|policy)|robot policy/i, title: 4, abstract: 2 },
];

function scorePaper(paper, now) {
  let relevanceScore = paper.categories.includes('cs.RO') ? 4 : 0;
  const matchedTerms = [];

  for (const rule of relevanceRules) {
    const titleMatch = rule.expression.test(paper.title);
    const abstractMatch = rule.expression.test(paper.abstract);
    if (titleMatch || abstractMatch) matchedTerms.push(rule.label);
    if (titleMatch) relevanceScore += rule.title;
    else if (abstractMatch) relevanceScore += rule.abstract;
  }

  const ageDays = Math.max(0, (now.getTime() - new Date(paper.published).getTime()) / 86_400_000);
  if (ageDays <= 14) relevanceScore += 3;
  else if (ageDays <= 45) relevanceScore += 2;
  else if (ageDays <= 120) relevanceScore += 1;

  return { relevanceScore, matchedTerms };
}

function publicRecord(paper, previous, now) {
  const { relevanceScore, matchedTerms } = scorePaper(paper, now);
  return {
    id: paper.id,
    title: paper.title,
    authors: paper.authors,
    published: paper.published,
    updated: paper.updated,
    primaryCategory: paper.primaryCategory,
    categories: paper.categories,
    url: paper.url,
    pdfUrl: paper.pdfUrl,
    matchedTerms,
    relevanceScore,
    status: previous?.status ?? 'candidate',
    firstSeen: previous?.firstSeen ?? now.toISOString(),
    ...(previous?.editorNote ? { editorNote: previous.editorNote } : {}),
  };
}

const queryUrl = new URL(ENDPOINT);
queryUrl.search = new URLSearchParams({
  search_query: SEARCH_QUERY,
  start: '0',
  max_results: String(MAX_RESULTS),
  sortBy: 'submittedDate',
  sortOrder: 'descending',
}).toString();

const parsed = parseEntries(await fetchFeed(queryUrl));
if (parsed.length === 0) {
  throw new Error('arXiv returned no entries; refusing to replace the current candidate pool.');
}

const now = new Date();
const current = existsSync(OUTPUT_PATH)
  ? JSON.parse(readFileSync(OUTPUT_PATH, 'utf8'))
  : { papers: [] };
const previousById = new Map((current.papers ?? []).map((paper) => [paper.id, paper]));
const mergedById = new Map(previousById);

for (const paper of parsed) {
  const previous = previousById.get(paper.id);
  const record = publicRecord(paper, previous, now);
  if (record.relevanceScore >= MIN_RELEVANCE) mergedById.set(record.id, record);
}

const papers = [...mergedById.values()]
  .sort(
    (a, b) =>
      b.relevanceScore - a.relevanceScore ||
      new Date(b.published).getTime() - new Date(a.published).getTime(),
  )
  .slice(0, POOL_LIMIT);

if (JSON.stringify(papers) === JSON.stringify(current.papers ?? [])) {
  console.log(`arXiv radar is unchanged (${papers.length} candidates).`);
  process.exit(0);
}

const snapshot = {
  schemaVersion: 1,
  generatedAt: now.toISOString(),
  source: {
    endpoint: ENDPOINT,
    query: SEARCH_QUERY,
    sortBy: 'submittedDate',
    sortOrder: 'descending',
  },
  policy: {
    stage: 'discovery',
    scoreMeaning: 'Metadata-only topic relevance; not a quality or correctness score.',
    reviewGate: 'Every new item remains a candidate until a human verifies the paper and its primary sources.',
  },
  papers,
};

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`Updated arXiv radar with ${papers.length} candidates from ${parsed.length} results.`);
