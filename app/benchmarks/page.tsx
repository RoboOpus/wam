import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CircleDot } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import {
  benchmarkEntryCount,
  benchmarkGroups,
  benchmarkRegistry,
  type BenchmarkEntry,
} from '@/lib/benchmark-catalog';

const basePath = '/wam';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'WAM Benchmark 与数据总览 — RoboOpus',
  description: '按评测对象、闭环类型、场景、模态与指标组织的 WAM Benchmark 和数据资源索引。',
};

function RegistryCard({ entry }: { entry: BenchmarkEntry }) {
  return (
    <article className="registry-card">
      <div className="registry-card-meta">
        <span>{entry.kind}</span>
        <span><CircleDot aria-hidden="true" /> {entry.status}</span>
      </div>
      <h3>{entry.name}</h3>
      <p className="registry-value">{entry.wamValue}</p>
      <dl className="registry-fields">
        <div><dt>评测对象</dt><dd>{entry.target}</dd></div>
        <div><dt>闭环类型</dt><dd>{entry.loop}</dd></div>
        <div><dt>场景范围</dt><dd>{entry.setting}</dd></div>
        <div><dt>覆盖重点</dt><dd>{entry.scope}</dd></div>
      </dl>
      <div className="registry-tags" aria-label="数据模态">
        {entry.modalities.map((modality) => <span key={modality}>{modality}</span>)}
      </div>
      <div className="registry-metrics">
        <span>主要指标</span>
        <p>{entry.metrics.join(' · ')}</p>
      </div>
      <footer>
        <small>{entry.sourceLevel} · 核验于 {entry.sourceCheckedAt}</small>
        <div>
          {entry.links.map((link) => (
            <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
              {link.label} <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
}

export default function BenchmarksPage() {
  return (
    <main className="registry-page">
      <SiteHeader compact />
      <section className="registry-hero">
        <div className="detail-crumbs">
          <a href={`${basePath}/landscape/#benchmarks`}><ArrowLeft aria-hidden="true" /> 返回领域地图</a>
          <span>BENCHMARK &amp; DATA REGISTRY / {benchmarkRegistry.updatedAt}</span>
        </div>
        <div className="registry-hero-grid">
          <div>
            <p className="eyebrow">COMPARABLE BEFORE RANKABLE</p>
            <h1>评测与数据<br /><em>可比性总览</em></h1>
          </div>
          <div>
            <strong>{benchmarkEntryCount.toString().padStart(2, '0')}</strong>
            <p>先记录对象、闭环、场景、模态和指标，再讨论谁更强。</p>
          </div>
        </div>
      </section>

      <nav className="registry-jump" aria-label="评测与数据目录">
        {benchmarkGroups.map((group) => (
          <a href={`#${group.id}`} key={group.id}>
            <span>{group.index}</span>
            <strong>{group.title}</strong>
            <small>{group.entries.length} ENTRIES</small>
          </a>
        ))}
      </nav>

      <section className="registry-directory">
        {benchmarkGroups.map((group) => (
          <article className="registry-group" id={group.id} key={group.id}>
            <header>
              <span>{group.index}</span>
              <div><h2>{group.title}</h2><p>{group.description}</p></div>
              <small>{group.entries.length.toString().padStart(2, '0')} ENTRIES</small>
            </header>
            <div className="registry-grid">
              {group.entries.map((entry) => <RegistryCard entry={entry} key={entry.id} />)}
            </div>
          </article>
        ))}
      </section>

      <section className="registry-note">
        <span>READING RULE / NOT A LEADERBOARD</span>
        <div>
          <h2>数字只有放回协议里，才具有可比性。</h2>
          <p>
            同名“成功率”可能来自不同任务、初始状态、相机、动作空间和评测次数。
            本页先固定比较字段；排行榜与模型结论要等协议对齐后再建立。
          </p>
        </div>
        <a
          href="https://github.com/RoboOpus/wam/blob/main/content/benchmarks/00-%E8%AF%84%E6%B5%8B%E4%B8%8E%E6%95%B0%E6%8D%AE%E7%89%88%E5%9B%BE.md"
          target="_blank"
          rel="noreferrer"
        >
          查看维护说明 <ArrowUpRight aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
