import snapshot from '@/data/arxiv/papers.json';

export type RadarPaper = {
  id: string;
  title: string;
  authors: string[];
  published: string;
  updated: string;
  primaryCategory: string;
  categories: string[];
  url: string;
  pdfUrl: string;
  matchedTerms: string[];
  relevanceScore: number;
  status: 'candidate' | 'reviewing' | 'reviewed' | 'ignored';
  firstSeen: string;
};

export type RadarSnapshot = {
  schemaVersion: number;
  generatedAt: string;
  source: {
    endpoint: string;
    query: string;
    sortBy: string;
    sortOrder: string;
  };
  policy: {
    stage: string;
    scoreMeaning: string;
    reviewGate: string;
  };
  papers: RadarPaper[];
};

export const radarSnapshot = snapshot as RadarSnapshot;
export const radarPapers = radarSnapshot.papers;

export function formatRadarDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(value));
}
