import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://roboopus.github.io/wam/'),
  title: 'WAM — RoboOpus Research Index',
  description:
    'RoboOpus 的 World Action Model 研究索引：从两篇论文开始，追踪未来预测如何进入机器人动作路径。',
  alternates: {
    canonical: 'https://roboopus.github.io/wam/',
  },
  icons: {
    icon: 'https://roboopus.github.io/wam/favicon.svg',
  },
  openGraph: {
    title: 'WAM — RoboOpus Research Index',
    description: '未来预测，应该出现在机器人动作路径的哪里？',
    type: 'website',
    url: 'https://roboopus.github.io/wam/',
    images: ['https://roboopus.github.io/wam/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAM — RoboOpus Research Index',
    description: '未来预测，应该出现在机器人动作路径的哪里？',
    images: ['https://roboopus.github.io/wam/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
