import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildFromRepository, buildSearchIndex } from '../scripts/build-search-index.mjs';
import { catalogGroups } from '../lib/paper-catalog.ts';
import { papers } from '../lib/papers.ts';
import { landscapeSections } from '../lib/landscape.ts';
const benchmarks = JSON.parse(readFileSync(new URL('../data/benchmarks.seed.json', import.meta.url), 'utf8'));
const radar = JSON.parse(readFileSync(new URL('../data/arxiv/papers.json', import.meta.url), 'utf8'));
const data = buildFromRepository();

test('all public source sets indexed once; detail replaces its catalog record', () => {
  const catalog = catalogGroups.flatMap((group) => group.papers);
  const count = catalog.length + landscapeSections.length + benchmarks.groups.flatMap((group) => group.entries).length + radar.papers.filter((paper) => !catalog.some((seed) => seed.id === paper.id)).length;
  assert.equal(data.records.length, count); assert.equal(new Set(data.records.map((item) => item.id)).size, count);
  assert.equal(data.records.filter((item) => item.type === 'article').length, Object.keys(papers).length);
  assert.match(data.source_revision, /^[a-f0-9]{40}$/);
});
test('full article body remains searchable and source evidence is not upgraded', () => {
  const detail = data.records.find((item) => item.id === 'wam:article:dreamzero');
  assert(detail.text.includes(papers.dreamzero.caveats[0]));
  assert(detail.text.includes(papers.dreamzero.nextQuestions[0]));
  assert(detail.text.length > detail.summary.length * 5);
  assert.match(detail.evidence, /未独立复现/);
  for (const item of data.records.filter((item) => item.type === 'paper')) assert.match(item.evidence, /^候选/);
  for (const item of data.records.filter((item) => item.type === 'benchmark')) assert.match(item.evidence, /不代表本站运行过/);
});
test('index uses explicit public field lists and never treats build date as source check', () => {
  const injected = structuredClone(papers); injected.dreamzero.private_notes = 'PRIVATE_MARKER';
  const fixture = buildSearchIndex({ catalog: catalogGroups, details: injected, landscape: landscapeSections, benchmarks, radar, revision: 'a'.repeat(40), generatedAt: '2099-01-01T00:00:00Z' });
  assert(!JSON.stringify(fixture).includes('PRIVATE_MARKER'));
  assert(fixture.records.filter((item) => item.type === 'article').every((item) => item.updated_at === null));
  assert(fixture.records.filter((item) => item.type === 'benchmark').every((item) => item.updated_at !== '2099-01-01'));
});
test('every exported link points to a built WAM page and exact anchor', () => {
  for (const item of data.records) {
    const url = new URL(item.url);
    assert.equal(url.origin, 'https://roboopus.github.io'); assert(url.pathname.startsWith('/wam/'));
    const html = readFileSync(new URL(`../dist/client/${url.pathname.slice(5)}index.html`, import.meta.url), 'utf8');
    assert.match(html, /<html/);
    if (url.hash) assert(html.includes(`id="${url.hash.slice(1)}"`), item.url);
  }
});
