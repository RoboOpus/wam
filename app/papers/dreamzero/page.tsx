import type { Metadata } from 'next';
import { PaperDetail } from '@/components/paper-detail';
import { papers } from '@/lib/papers';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'DreamZero 阅读笔记 — RoboOpus WAM',
  description: 'DreamZero 的方法、作者报告结果、复现门槛与 RoboOpus 编辑判断。',
  alternates: { canonical: 'https://roboopus.github.io/wam/papers/dreamzero/' },
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function DreamZeroPage() {
  return <PaperDetail paper={papers.dreamzero} next={papers['fast-wam']} />;
}
