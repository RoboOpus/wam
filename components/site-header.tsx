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
        <a href={`${basePath}/radar/`}>雷达</a>
        <a href={`${basePath}/#papers`}>精读</a>
        <a href={`${basePath}/landscape/#methods`}>路线</a>
        <a href="https://github.com/RoboOpus/wam" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
