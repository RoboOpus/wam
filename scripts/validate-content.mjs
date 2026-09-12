import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const registryPath = resolve(process.cwd(), 'data', 'benchmarks.seed.json');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const requiredEntryFields = [
  'id',
  'name',
  'kind',
  'target',
  'loop',
  'setting',
  'scope',
  'wamValue',
  'status',
  'sourceLevel',
  'sourceCheckedAt',
];

function assert(condition, message) {
  if (!condition) throw new Error(`Content validation failed: ${message}`);
}

function assertText(value, path) {
  assert(typeof value === 'string' && value.trim().length > 0, `${path} must be non-empty text`);
}

assert(registry.schemaVersion === 1, 'benchmarks.schemaVersion must be 1');
assert(/^\d{4}-\d{2}-\d{2}$/.test(registry.updatedAt), 'benchmarks.updatedAt must be YYYY-MM-DD');
assert(Array.isArray(registry.groups) && registry.groups.length > 0, 'benchmarks.groups must not be empty');

const groupIds = new Set();
const entryIds = new Set();
let entryCount = 0;

for (const [groupIndex, group] of registry.groups.entries()) {
  const groupPath = `benchmarks.groups[${groupIndex}]`;
  for (const field of ['id', 'index', 'title', 'description']) {
    assertText(group[field], `${groupPath}.${field}`);
  }
  assert(!groupIds.has(group.id), `duplicate benchmark group id "${group.id}"`);
  groupIds.add(group.id);
  assert(Array.isArray(group.entries) && group.entries.length > 0, `${groupPath}.entries must not be empty`);

  for (const [entryIndex, entry] of group.entries.entries()) {
    const entryPath = `${groupPath}.entries[${entryIndex}]`;
    for (const field of requiredEntryFields) assertText(entry[field], `${entryPath}.${field}`);
    assert(!entryIds.has(entry.id), `duplicate benchmark entry id "${entry.id}"`);
    entryIds.add(entry.id);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.sourceCheckedAt), `${entryPath}.sourceCheckedAt must be YYYY-MM-DD`);
    assert(entry.status === '已核验', `${entryPath}.status must be 已核验`);
    assert(entry.sourceLevel === '一级来源', `${entryPath}.sourceLevel must be 一级来源`);

    for (const field of ['modalities', 'metrics', 'links']) {
      assert(Array.isArray(entry[field]) && entry[field].length > 0, `${entryPath}.${field} must not be empty`);
    }

    for (const [linkIndex, link] of entry.links.entries()) {
      assertText(link.label, `${entryPath}.links[${linkIndex}].label`);
      assertText(link.url, `${entryPath}.links[${linkIndex}].url`);
      const url = new URL(link.url);
      assert(['http:', 'https:'].includes(url.protocol), `${entryPath}.links[${linkIndex}] must use HTTP(S)`);
    }
    entryCount += 1;
  }
}

console.log(
  `Content validation passed: ${entryCount} benchmark/data entries in ${registry.groups.length} groups.`,
);
