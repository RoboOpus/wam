import { ArrowLeft, ArrowRight, ArrowUpRight, CircleDot } from 'lucide-react';
import type { PaperRecord } from '@/lib/papers';

import { SiteHeader } from './site-header';

const basePath = '/wam';

export function PaperDetail({ paper, next }: { paper: PaperRecord; next: PaperRecord }) {
  return (
    <main className={`paper-detail detail-${paper.accent}`}>
      <SiteHeader compact />

      <section className="detail-hero">
        <div className="detail-crumbs">
          <a href={`${basePath}/`}>
            <ArrowLeft aria-hidden="true" /> 返回索引
          </a>
          <span>SEED PAPER / {paper.index}</span>
        </div>
        <div className="detail-hero-grid">
          <div>
            <p className="eyebrow">{paper.name} · PAPER NOTE</p>
            <h1>{paper.title}</h1>
            <p className="detail-deck">{paper.subtitle}</p>
          </div>
          <dl className="detail-meta">
            {paper.meta.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="answer-board">
        <div>
          <span>QUESTION</span>
          <h2>{paper.question}</h2>
        </div>
        <div>
          <span>SHORT ANSWER</span>
          <p>{paper.answer}</p>
        </div>
      </section>

      <section className="detail-section pathway-section">
        <div className="detail-section-label">01 / ACTION PATH</div>
        <div className="detail-section-body">
          <h2>未来如何进入动作路径</h2>
          <div className="large-action-path" aria-label={`${paper.name} 动作路径`}>
            {paper.route.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < paper.route.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
          <div className="mechanism-grid">
            {paper.mechanism.map((item, index) => (
              <article key={item.title}>
                <span>M{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section evidence-section">
        <div className="detail-section-label">02 / EVIDENCE</div>
        <div className="detail-section-body">
          <div className="title-with-note">
            <h2>作者给出的证据</h2>
            <p><CircleDot /> 以下数字均为作者报告，尚未由 RoboOpus 独立复现。</p>
          </div>
          <div className="detail-metrics">
            {paper.metrics.map((metric) => (
              <article key={metric.label}>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>
          <div className="evidence-list">
            {paper.evidence.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-section audit-section">
        <div className="detail-section-label">03 / AUDIT</div>
        <div className="detail-section-body audit-grid">
          <div>
            <h2>阅读时不能跳过的限制</h2>
            <ol className="caveat-list">
              {paper.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
            </ol>
          </div>
          <div className="repro-card">
            <p className="eyebrow">REPRODUCTION SNAPSHOT</p>
            <dl>
              {paper.reproduction.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="verdict-section">
        <span>ROBOOPUS / EDITORIAL JUDGMENT</span>
        <blockquote>{paper.verdict}</blockquote>
        <div className="next-questions">
          <p>接下来值得追问</p>
          <ol>
            {paper.nextQuestions.map((question) => <li key={question}>{question}</li>)}
          </ol>
        </div>
      </section>

      <section className="source-section">
        <div>
          <span>SOURCE TRACE</span>
          <h2>只回链原始材料</h2>
        </div>
        <div className="source-list">
          {paper.sources.map((source) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
              <strong>{source.label}</strong>
              <span>{source.note}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <a className="next-paper" href={`${basePath}/papers/${next.slug}/`}>
        <span>NEXT PAPER / {next.index}</span>
        <strong>{next.name}</strong>
        <ArrowRight aria-hidden="true" />
      </a>
    </main>
  );
}
