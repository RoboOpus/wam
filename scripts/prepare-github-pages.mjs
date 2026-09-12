import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const outputRoot = join(process.cwd(), 'dist', 'client');
const prefixedAssets = join(outputRoot, 'wam', '_next');
const publicAssets = join(outputRoot, '_next');

if (!existsSync(join(outputRoot, 'index.html'))) {
  throw new Error('Static homepage was not generated.');
}

if (!existsSync(prefixedAssets)) {
  throw new Error('Expected /wam asset bundle was not generated.');
}

cpSync(prefixedAssets, publicAssets, { recursive: true });

function makeStaticHtml(sourcePath, targetPath = sourcePath) {
  const source = readFileSync(sourcePath, 'utf8');
  const html = source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*\/?\s*>/gi, '')
    .replace(/\sdata-rsc-css-href="[^"]*"/gi, '');

  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(targetPath, html, 'utf8');
}

makeStaticHtml(join(outputRoot, 'index.html'));
makeStaticHtml(join(outputRoot, '404.html'));

for (const route of ['landscape', 'papers', 'radar', 'papers/dreamzero', 'papers/fast-wam']) {
  const routeFile = join(outputRoot, `${route}.html`);
  if (!existsSync(routeFile)) {
    throw new Error(`Static route was not generated: ${route}`);
  }

  makeStaticHtml(routeFile);
  makeStaticHtml(routeFile, join(outputRoot, route, 'index.html'));
}

console.log('Prepared GitHub Pages artifact with /wam assets and clean directory routes.');
