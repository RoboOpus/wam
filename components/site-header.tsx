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
        <a href={`${basePath}/landscape/`}>地图</a>
        <a href={`${basePath}/papers/`}>论文库</a>
        <a href={`${basePath}/benchmarks/`}>评测库</a>
        <a href={`${basePath}/radar/`}>雷达</a>
        <a href="https://roboopus.github.io/atlas/search/?origin=wam">跨站检索</a>
        <a href="https://github.com/RoboOpus/wam" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
