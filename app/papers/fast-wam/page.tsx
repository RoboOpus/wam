import type { Metadata } from 'next';
import { PaperDetail } from '@/components/paper-detail';
import { papers } from '@/lib/papers';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Fast-WAM 阅读笔记 — RoboOpus WAM',
  description: 'Fast-WAM 的方法、作者报告结果、复现门槛与 RoboOpus 编辑判断。',
  alternates: { canonical: 'https://roboopus.github.io/wam/papers/fast-wam/' },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function FastWamPage() {
  return <PaperDetail paper={papers['fast-wam']} next={papers.dreamzero} />;
}
