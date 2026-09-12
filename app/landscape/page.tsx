import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CircleDot, MoveRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { radarPapers } from '@/lib/arxiv';
import { landscapeEntryCount, landscapeSections, type LandscapeEntry } from '@/lib/landscape';
import { paperList } from '@/lib/papers';

const basePath = '/wam';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'WAM 领域地图 — RoboOpus',
  description: 'World Action Model 的定义、时间线、方法、论文、数据、代码、生态与开放问题一级索引。',
};

function Entry({ entry }: { entry: LandscapeEntry }) {
  const content = (
    <>
      <div className="landscape-entry-meta">
        <span>{entry.kind}</span>
        <span><CircleDot aria-hidden="true" /> {entry.status}</span>
      </div>
      <h3>{entry.title}</h3>
      <p>{entry.note}</p>
      {entry.href ? <MoveRight aria-hidden="true" /> : null}
    </>
  );

  if (!entry.href) {
    return <article className="landscape-entry">{content}</article>;
  }

  const external = entry.href.startsWith('http');
  return (
    <a
      className="landscape-entry landscape-entry-link"
      href={entry.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {content}
    </a>
  );
}

export default function LandscapePage() {
  return (
    <main className="landscape-page">
      <SiteHeader compact />

      <section className="landscape-page-hero">
        <div className="detail-crumbs">
          <a href={`${basePath}/`}><ArrowLeft aria-hidden="true" /> 返回首页</a>
          <span>FIELD MAP / V0.4 / 2026-09-12</span>
        </div>
        <div className="landscape-page-hero-grid">
          <div>
            <p className="eyebrow">WORLD ACTION MODELS</p>
            <h1>WAM 的<br /><em>一级仓库</em></h1>
          </div>
          <div className="landscape-page-intro">
            <p>
              先把领域边界和入口铺开，再决定哪里值得精读、复现或持续监测。
              当前条目是可追溯的索引位，不用数量伪装知识成熟度。
            </p>
            <a href="https://github.com/RoboOpus/wam" target="_blank" rel="noreferrer">
              在 GitHub 查看源文件 <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <dl className="landscape-page-stats">
          <div><dt>{landscapeSections.length}</dt><dd>一级板块</dd></div>
          <div><dt>{landscapeEntryCount}</dt><dd>首批索引位</dd></div>
          <div><dt>{radarPapers.length}</dt><dd>雷达候选</dd></div>
          <div><dt>{paperList.length}</dt><dd>结构化精读</dd></div>
        </dl>
      </section>

      <section className="landscape-levels" aria-label="知识深度说明">
        <span>DEPTH MODEL</span>
        <div><strong>L1</strong><p>领域地图：定义一级入口与边界。</p></div>
        <div><strong>L2</strong><p>结构索引：记录来源、状态与关系。</p></div>
        <div><strong>L3</strong><p>精读复现：形成证据、判断与实验。</p></div>
      </section>

      <nav className="landscape-jump" aria-label="领域地图目录">
        {landscapeSections.map((section) => (
          <a href={`#${section.id}`} key={section.id}>
            <span>{section.index}</span>{section.title}
          </a>
        ))}
      </nav>

      <section className="landscape-directory">
        {landscapeSections.map((section) => (
          <article className="landscape-group" id={section.id} key={section.id}>
            <header>
              <div className="landscape-group-index">
                <span>{section.index}</span>
                <small>{section.english}</small>
              </div>
              <div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              <span className="landscape-group-count">
                {section.entries.length.toString().padStart(2, '0')} ENTRIES
              </span>
            </header>
            <div className="landscape-entry-grid">
              {section.entries.map((entry) => <Entry entry={entry} key={`${section.id}-${entry.title}`} />)}
            </div>
          </article>
        ))}
      </section>

      <section className="landscape-next-step">
        <span>NEXT / BREADTH FIRST</span>
        <h2>下一步不是再加一篇精读，而是补齐这些入口之间的连接。</h2>
        <p>优先增加统一字段、来源校验、交叉标签和覆盖度统计；精读页保留为 L3 样例。</p>
        <a href={`${basePath}/radar/`}>查看每日论文候选 <MoveRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}
