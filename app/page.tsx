import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenText,
  CircleDot,
  Code2,
  MoveRight,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { formatRadarDate, radarPapers, radarSnapshot } from '@/lib/arxiv';
import { paperList } from '@/lib/papers';

const basePath = '/wam';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="question-board" id="top">
        <div className="question-kicker">
          <span>RESEARCH QUESTION / 001</span>
          <span>知识页更新于 2026-09-11</span>
        </div>
        <div className="question-grid">
          <div>
            <p className="eyebrow">WORLD ACTION MODELS</p>
            <h1>
              WAM 是否必须在
              <em>推理时想象未来？</em>
            </h1>
          </div>
          <div className="question-aside">
            <p>
              用两篇立场互补的论文建立第一组知识样本：一篇把未来视频变成策略核心，
              一篇把显式想象从部署路径中移除。
            </p>
            <a className="text-link" href="#thesis">
              查看对照结论 <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="radar-preview" id="radar">
        <div className="radar-preview-heading">
          <div>
            <span>ARXIV RADAR / CANDIDATE QUEUE</span>
            <h2>先发现，再核验</h2>
          </div>
          <div className="radar-preview-note">
            <p>
              每天 08:00（北京时间）检索机器人世界模型与 VLA。相关度排序只负责缩小阅读范围，
              所有结果先进入候选队列，不自动冒充已审阅知识。
            </p>
            <a className="text-link" href={`${basePath}/radar/`}>
              打开论文雷达 <ArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="radar-mini-grid">
          {radarPapers.slice(0, 3).map((paper) => (
            <article className="radar-mini-card" key={paper.id}>
              <div>
                <span className="radar-score">相关度 {paper.relevanceScore}</span>
                <span className="status"><CircleDot /> 待人工审阅</span>
              </div>
              <h3>{paper.title}</h3>
              <p>{paper.authors.slice(0, 3).join(' · ')}{paper.authors.length > 3 ? ' 等' : ''}</p>
              <footer>
                <span>{formatRadarDate(paper.published)}</span>
                <a href={paper.url} target="_blank" rel="noreferrer">
                  arXiv <ArrowUpRight aria-hidden="true" />
                </a>
              </footer>
            </article>
          ))}
        </div>
        <p className="radar-sync-line">
          当前收录 {radarPapers.length} 篇候选 · 数据变化于 {formatRadarDate(radarSnapshot.generatedAt)}
        </p>
      </section>

      <section className="paper-section" id="papers">
        <div className="section-heading">
          <span>SEED PAPERS</span>
          <h2>两篇，先把问题讲透</h2>
          <p>数字均标注为作者报告结果；RoboOpus 将事实、作者主张与编辑判断分层展示。</p>
        </div>

        <div className="paper-grid">
          {paperList.map((paper) => (
            <article className={`paper-card paper-${paper.accent}`} id={paper.slug} key={paper.slug}>
              <div className="paper-card-head">
                <span className="paper-index">{paper.index}</span>
                <span className="status"><CircleDot /> 已核验元数据</span>
              </div>
              <div className="paper-title-block">
                <p>{paper.name}</p>
                <h3>{paper.title}</h3>
                <span>{paper.subtitle}</span>
              </div>
              <div className="action-path" aria-label={`${paper.name} 动作路径`}>
                {paper.route.slice(0, 3).map((step, index) => (
                  <div className="path-step" key={step}>
                    <span>{step}</span>
                    {index < 2 ? <i aria-hidden="true">→</i> : null}
                  </div>
                ))}
              </div>
              <dl className="metric-row">
                {paper.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="paper-actions">
                <a className="primary-paper-link" href={`${basePath}/papers/${paper.slug}/`}>
                  阅读笔记 <MoveRight />
                </a>
                <a href={paper.sources[0].href} target="_blank" rel="noreferrer">
                  <BookOpenText /> arXiv <ArrowUpRight />
                </a>
                <a href={paper.sources[2].href} target="_blank" rel="noreferrer">
                  <Code2 /> Code <ArrowUpRight />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="thesis-section" id="thesis">
        <div className="thesis-number">01 / 01</div>
        <div>
          <p className="eyebrow">CURRENT READING</p>
          <h2>争论不在“要不要世界模型”，而在世界预测应出现在哪里。</h2>
        </div>
        <div className="thesis-copy">
          <p>
            DreamZero 把生成未来保留在闭环推理路径；Fast-WAM 的受控比较则认为，
            视频共训对动作性能的贡献可能大于部署时显式生成未来。
          </p>
          <p className="editor-note">
            <strong>编辑判断</strong>
            两者并不构成最终胜负：任务时长、接触复杂度、算力预算与是否需要候选动作评估，
            可能决定显式想象何时值得。
          </p>
        </div>
      </section>

      <section className="method-strip" id="method">
        <span>RoboOpus method</span>
        <p>原论文事实 → 作者主张 → 对照阅读 → 编辑判断 → 复现状态</p>
        <span>v0.2 / {radarPapers.length} 候选 + {paperList.length} 精读</span>
      </section>
    </main>
  );
}
