import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalogGroups } from '../lib/paper-catalog.ts';
import { papers } from '../lib/papers.ts';
import { landscapeSections } from '../lib/landscape.ts';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const flatten = (value) => typeof value === 'string' || typeof value === 'number' ? String(value)
  : Array.isArray(value) ? value.map(flatten).join(' ') : value && typeof value === 'object' ? Object.values(value).map(flatten).join(' ') : '';
const publicOrigin = 'https://roboopus.github.io';

export function buildSearchIndex({ catalog, details, landscape, benchmarks, radar, revision, generatedAt }) {
  const records = [], catalogIds = new Set();
  function add(type, id, title, summary, text, route, options = {}) {
    records.push({ id: `wam:${type}:${id}`, type, title, summary,
      text: flatten(text).replace(/\s+/gu, ' ').trim(), url: `${publicOrigin}${route}`,
      tracks: ['wam'], updated_at: null, date_label: '记录日期', identifiers: { arxiv: null },
      evidence: '结构化整理 · 非独立复现', ...options });
  }
  for (const group of catalog) for (const paper of group.papers) {
    if (catalogIds.has(paper.id)) throw new Error(`Duplicate catalog identity: ${paper.id}`);
    catalogIds.add(paper.id);
    const detail = Object.values(details).find((entry) => paper.detailUrl === `/wam/papers/${entry.slug}/` || paper.detailUrl === `/wam/papers/${entry.slug}`);
    if (paper.detailUrl && !detail) throw new Error(`Missing detail source: ${paper.detailUrl}`);
    if (detail) {
      add('article', detail.slug, `${detail.name} · ${detail.title}`, detail.subtitle,
        [detail.name, detail.title, detail.subtitle, detail.question, detail.answer, detail.route, detail.meta,
          detail.metrics, detail.mechanism, detail.evidence, detail.caveats, detail.reproduction, detail.verdict, detail.nextQuestions, detail.sources],
        `/wam/papers/${detail.slug}/`, { identifiers: { arxiv: paper.id }, evidence: '已有精读样例 · 作者报告、编辑判断与局限见正文 · 未独立复现' });
    } else add('publication', paper.id, `${paper.shortTitle} · ${paper.title}`, `${group.title} · ${paper.relation} · ${paper.coupling} · ${paper.substrate}`,
      [paper.shortTitle, paper.title, paper.year, paper.relation, paper.coupling, paper.substrate, group.description],
      `/wam/papers/#paper-${paper.id}`, { identifiers: { arxiv: paper.id }, evidence: '论文目录 · 元数据已核验不等于全文评审或独立复现' });
  }
  for (const detail of Object.values(details)) if (!records.some((item) => item.id === `wam:article:${detail.slug}`)) throw new Error(`Unindexed article: ${detail.slug}`);
  for (const section of landscape) add('guide', section.id, section.title, section.description,
    [section.title, section.english, section.description, section.entries.map(({ title, kind, status, note }) => [title, kind, status, note])],
    `/wam/landscape/#${section.id}`, { evidence: '领域地图 · 分类、线索与开放问题，不是算法有效性证明' });
  for (const group of benchmarks.groups) for (const entry of group.entries) add('benchmark', entry.id, entry.name, entry.wamValue,
    [entry.name, entry.kind, entry.target, entry.loop, entry.setting, entry.scope, entry.modalities, entry.metrics, entry.wamValue, group.title],
    `/wam/benchmarks/#benchmark-${entry.id}`, { updated_at: entry.sourceCheckedAt, date_label: '来源核对', evidence: '一级来源核验 · 收录不代表本站运行过评测' });
  for (const paper of radar.papers) {
    if (catalogIds.has(paper.id)) continue;
    add('paper', paper.id, paper.title, 'WAM 雷达的标题级元数据候选；尚未完成论文评审。',
      [paper.title, paper.authors, paper.primaryCategory, paper.categories, paper.matchedTerms],
      `/wam/radar/#paper-${paper.id}`, { identifiers: { arxiv: paper.id }, updated_at: paper.firstSeen ?? null, date_label: '首次收录', evidence: '候选 · 标题与作者元数据，不以相关度代替质量' });
  }
  const ids = new Set();
  for (const item of records) {
    if (!/^wam:[a-z]+:[A-Za-z0-9._-]+$/.test(item.id) || ids.has(item.id) || !item.title || !item.summary || !item.text) throw new Error(`Invalid search record: ${item.id}`);
    ids.add(item.id);
    const url = new URL(item.url);
    if (url.origin !== publicOrigin || !url.pathname.startsWith('/wam/')) throw new Error('Search link outside WAM');
  }
  return { schema_version: '1.0.0', producer: 'RoboOpus/wam', source_revision: revision, generated_at: generatedAt,
    scope: 'Public rendered source records only; build time is not source verification time. Private materials and raw source captures are excluded.',
    radar_snapshot_at: radar.generatedAt, records: records.sort((a, b) => a.id.localeCompare(b.id)) };
}

export function buildFromRepository() {
  const revision = execFileSync('git', ['-c', `safe.directory=${repo.replaceAll('\\', '/')}`, 'rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim();
  return buildSearchIndex({ catalog: catalogGroups, details: papers, landscape: landscapeSections,
    benchmarks: JSON.parse(readFileSync(path.join(repo, 'data/benchmarks.seed.json'), 'utf8')),
    radar: JSON.parse(readFileSync(path.join(repo, 'data/arxiv/papers.json'), 'utf8')), revision, generatedAt: new Date().toISOString() });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = buildFromRepository();
  const folder = path.join(repo, 'dist/client/data');
  mkdirSync(folder, { recursive: true });
  writeFileSync(path.join(folder, 'search-index.json'), JSON.stringify(data, null, 2) + '\n');
  console.log(`Exported WAM search: ${data.records.length} records; private input excluded.`);
}
