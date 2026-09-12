import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleDot } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { catalogGroups, catalogPaperCount, catalogReviewedCount } from '@/lib/paper-catalog';

const basePath = '/wam';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'WAM 论文总览 — RoboOpus',
  description: '按基础脉络、架构路线和前沿议题组织的 World Action Model 论文索引。',
};

export default function PapersPage() {
  return (
    <main className="catalog-page">
      <SiteHeader compact />
      <section className="catalog-hero">
        <div className="detail-crumbs">
          <a href={`${basePath}/`}><ArrowLeft aria-hidden="true" /> 返回首页</a>
          <span>PAPER CATALOG / VERIFIED METADATA</span>
        </div>
        <div className="catalog-hero-grid">
          <div>
            <p className="eyebrow">BREADTH BEFORE DEPTH</p>
            <h1>WAM<br /><em>论文总览</em></h1>
          </div>
          <div>
            <p>这里先回答“有哪些路线、各自处在什么位置”，不把元数据索引冒充论文结论。</p>
            <strong>{catalogPaperCount.toString().padStart(2, '0')} / CURATED SEEDS</strong>
          </div>
        </div>
      </section>

      <section className="catalog-overview" aria-label="论文库概况">
        <div className="catalog-stats">
          <div><strong>{catalogPaperCount}</strong><span>已核验种子</span></div>
          <div><strong>{catalogGroups.length}</strong><span>阅读路线</span></div>
          <div><strong>{catalogReviewedCount}</strong><span>精读样例</span></div>
          <div><strong>24</strong><span>雷达候选</span></div>
        </div>
        <aside className="catalog-policy">
          <span>分类说明</span>
          <p>
            早期工作按今天的 WAM 问题意识回溯归类为“前置脉络”，不代表作者在原论文中使用了
            World Action Model 这一术语。所有条目先核验元数据，只有完成证据整理后才标记“已精读”。
          </p>
        </aside>
        <nav className="catalog-jump" aria-label="论文路线">
          {catalogGroups.map((group) => (
            <a href={`#${group.id}`} key={group.id}>
              <span>{group.index}</span>
              <strong>{group.title}</strong>
              <small>{group.papers.length} 篇</small>
            </a>
          ))}
        </nav>
      </section>

      <section className="catalog-groups">
        {catalogGroups.map((group) => (
          <article className="catalog-group" id={group.id} key={group.id}>
            <header>
              <span>{group.index}</span>
              <div><h2>{group.title}</h2><p>{group.description}</p></div>
              <small>{group.papers.length.toString().padStart(2, '0')} PAPERS</small>
            </header>
            <div className="catalog-list">
              {group.papers.map((paper) => (
                <article className="catalog-row" key={paper.id}>
                  <time>{paper.year}</time>
                  <div className="catalog-paper-title">
                    <span>{paper.shortTitle}</span>
                    <h3>{paper.title}</h3>
                  </div>
                  <div className="catalog-paper-tags">
                    <span>{paper.relation}</span><span>{paper.coupling}</span><span>{paper.substrate}</span>
                  </div>
                  <div className="catalog-paper-status"><CircleDot aria-hidden="true" /> {paper.status}</div>
                  <div className="catalog-paper-actions">
                    {paper.detailUrl ? (
                      <a href={paper.detailUrl} aria-label={`阅读 ${paper.shortTitle} 精读`}>
                        精读 <ArrowRight aria-hidden="true" />
                      </a>
                    ) : null}
                    <a href={paper.paperUrl} target="_blank" rel="noreferrer" aria-label={`打开 ${paper.shortTitle} arXiv`}>
                      arXiv <ArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="catalog-next">
        <div>
          <span>NEXT / CONTINUOUS DISCOVERY</span>
          <h2>从目录转向每日增量</h2>
          <p>论文库保存人工核验后的稳定入口；新论文先进入 Radar 候选池，再决定是否纳入。</p>
        </div>
        <a href={`${basePath}/radar/`}>查看 arXiv Radar <ArrowRight aria-hidden="true" /></a>
      </section>
    </main>
  );
}
