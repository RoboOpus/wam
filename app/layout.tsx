import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://roboopus.github.io/wam/'),
  title: 'WAM — RoboOpus Research Index',
  description:
    'RoboOpus 的 World Action Model 领域地图：定义、时间线、方法、论文雷达、数据、代码与开放问题。',
  alternates: {
    canonical: 'https://roboopus.github.io/wam/',
  },
  icons: {
    icon: 'https://roboopus.github.io/wam/favicon.svg',
  },
  openGraph: {
    title: 'WAM — RoboOpus Research Index',
    description: '先建 WAM 领域地图，再逐步精读与复现。',
    type: 'website',
    url: 'https://roboopus.github.io/wam/',
    images: ['https://roboopus.github.io/wam/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAM — RoboOpus Research Index',
    description: '先建 WAM 领域地图，再逐步精读与复现。',
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
