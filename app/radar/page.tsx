import { ArrowLeft, ArrowUpRight, CircleDot } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { formatRadarDate, radarPapers, radarSnapshot } from '@/lib/arxiv';

const basePath = '/wam';

export const dynamic = 'force-static';

export default function RadarPage() {
  return (
    <main className="radar-page">
      <SiteHeader compact />

      <section className="radar-hero">
        <div className="detail-crumbs">
          <a href={`${basePath}/`}><ArrowLeft aria-hidden="true" /> 返回首页</a>
          <span>DISCOVERY LAYER / V0.2</span>
        </div>
        <div className="radar-hero-grid">
          <div>
            <p className="eyebrow">ARXIV RADAR</p>
            <h1>候选先排队，<br />结论后发布。</h1>
          </div>
          <div className="radar-manifesto">
            <p>
              这不是“高分论文榜”。脚本只根据题名、摘要命中词、学科分类和时效性计算主题相关度，
              帮助减少检索噪声；论文质量、实验可信度与复现价值仍由人工审阅。
            </p>
          </div>
        </div>
        <dl className="radar-stat-grid">
          <div><dt>{radarPapers.length}</dt><dd>候选论文</dd></div>
          <div><dt>08:00</dt><dd>北京时间每日检索</dd></div>
          <div><dt>2</dt><dd>已完成精读</dd></div>
          <div><dt>{formatRadarDate(radarSnapshot.generatedAt)}</dt><dd>候选池最近变化</dd></div>
        </dl>
      </section>

      <section className="radar-queue">
        <div className="radar-queue-heading">
          <div>
            <span>CANDIDATE QUEUE</span>
            <h2>按主题相关度排序</h2>
          </div>
          <p><CircleDot /> candidate 表示“值得看”，不表示“已经核验”。</p>
        </div>

        <div className="radar-list">
          {radarPapers.map((paper, index) => (
            <article className="radar-row" id={`paper-${paper.id}`} key={paper.id}>
              <div className="radar-rank">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{paper.relevanceScore}</strong>
                <small>相关度</small>
              </div>
              <div className="radar-record">
                <div className="radar-record-meta">
                  <span>{paper.primaryCategory}</span>
                  <span>{formatRadarDate(paper.published)}</span>
                  <span>{paper.status}</span>
                </div>
                <h3>{paper.title}</h3>
                <p>{paper.authors.slice(0, 5).join(' · ')}{paper.authors.length > 5 ? ' 等' : ''}</p>
                <div className="radar-tags">
                  {paper.matchedTerms.map((term) => <span key={term}>{term}</span>)}
                </div>
              </div>
              <div className="radar-source-actions">
                <a href={paper.url} target="_blank" rel="noreferrer">
                  摘要页 <ArrowUpRight aria-hidden="true" />
                </a>
                <a href={paper.pdfUrl} target="_blank" rel="noreferrer">
                  PDF <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="radar-policy">
        <span>REVIEW GATE</span>
        <div>
          <h2>自动发现止于候选。</h2>
          <p>进入正式知识页前，至少核验 arXiv 版本、项目页、代码仓库、核心实验口径与限制条件。</p>
        </div>
        <a href="https://info.arxiv.org/help/api/user-manual.html" target="_blank" rel="noreferrer">
          arXiv API 说明 <ArrowUpRight aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
