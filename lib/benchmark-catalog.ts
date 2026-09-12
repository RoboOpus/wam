import registry from '@/data/benchmarks.seed.json';

export type BenchmarkLink = {
  label: string;
  url: string;
};

export type BenchmarkEntry = {
  id: string;
  name: string;
  kind: string;
  target: string;
  loop: string;
  setting: string;
  scope: string;
  modalities: string[];
  metrics: string[];
  wamValue: string;
  status: '已核验';
  sourceLevel: '一级来源';
  sourceCheckedAt: string;
  links: BenchmarkLink[];
};

export type BenchmarkGroup = {
  id: string;
  index: string;
  title: string;
  description: string;
  entries: BenchmarkEntry[];
};

export type BenchmarkRegistry = {
  schemaVersion: number;
  updatedAt: string;
  notes: string[];
  groups: BenchmarkGroup[];
};

export const benchmarkRegistry = registry as BenchmarkRegistry;
export const benchmarkGroups = benchmarkRegistry.groups;
export const benchmarkEntryCount = benchmarkGroups.reduce(
  (sum, group) => sum + group.entries.length,
  0,
);
