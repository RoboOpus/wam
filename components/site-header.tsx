import { ArrowUpRight } from 'lucide-react';

const basePath = '/wam';

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`site-header${compact ? ' compact' : ''}`}>
      <a className="brand" href={`${basePath}/`} aria-label="RoboOpus WAM 首页">
        <span className="brand-mark">R/O</span>
        <span>
          <strong>WAM</strong>
          <small>RoboOpus Research Index</small>
        </span>
      </a>
      <nav aria-label="主导航">
        <a href={`${basePath}/#papers`}>论文</a>
        <a href={`${basePath}/#thesis`}>争论</a>
        <a href={`${basePath}/#method`}>方法</a>
        <a href="https://github.com/RoboOpus/wam" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
