// Gera o site de documentação (site/) a partir de docs/*.md, usando o próprio Constela.
// Rode `npm run build` antes. Uso: node scripts/site.mjs

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { resolveTheme, contrast } from './lib/tokens.mjs';
import { utilityName } from './lib/names.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'site');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const light = resolveTheme(tokens, 'light');
const dark = resolveTheme(tokens, 'dark');

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
cpSync(join(root, 'dist'), join(out, 'assets'), { recursive: true });
cpSync(join(root, 'site-src/site.css'), join(out, 'assets/site.css'));
cpSync(join(root, 'site-src/site.js'), join(out, 'assets/site.js'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- páginas ----------
const pages = readdirSync(join(root, 'docs'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const src = readFileSync(join(root, 'docs', f), 'utf8');
    const m = /^---\n([\s\S]*?)\n---\n/.exec(src);
    const meta = Object.fromEntries((m?.[1] ?? '').split('\n').filter(Boolean).map((l) => {
      const i = l.indexOf(':');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }));
    return { file: f, slug: f.replace(/\.md$/, ''), body: m ? src.slice(m[0].length) : src, ...meta, order: Number(meta.order ?? 99) };
  });

const SECTIONS = ['Introdução', 'Início rápido', 'Fundamentos', 'Componentes', 'Marca', 'Projeto'];
pages.sort((a, b) => SECTIONS.indexOf(a.section) - SECTIONS.indexOf(b.section) || a.order - b.order);
const href = (p) => (p.slug === 'index' ? './' : `${p.slug}.html`);

// ---------- blocos gerados a partir dos tokens ----------
const swatch = (name) => `<span class="sw" style="background:var(--${name})" aria-hidden="true"></span>`;
const ratio = (a, b) => (/^#/.test(a) && /^#/.test(b) ? contrast(a, b).toFixed(2).replace('.', ',') + ':1' : '');

const blocks = {
  escalas() {
    const groups = [['Teal', 'teal'], ['Amber', 'amber'], ['Neutros', 'neutral']];
    let html = '';
    for (const [label, p] of groups) {
      const items = tokens.color.tokens.filter((t) => new RegExp(`^${p}-\\d+$`).test(t.name));
      html += `<h3>${label}</h3><div class="scale">` + items.map((t) => {
        const step = t.name.split('-')[1];
        const ink = contrast(t.value, '#111827') > contrast(t.value, '#ffffff') ? '#111827' : '#ffffff';
        return `<div class="scale__step" style="background:${t.value};color:${ink}" title="${esc(t.usage)}"><b>${step}</b><code>${t.value}</code></div>`;
      }).join('') + '</div>';
    }
    const status = tokens.color.tokens.filter((t) => /^(success|warning|error|info|scheduled)(-|$)/.test(t.name));
    html += '<h3>Status</h3><table><thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead><tbody>' +
      status.map((t) => `<tr><td>${swatch(t.name)}<code>${t.name}</code></td><td><code>${t.value}</code></td><td>${esc(t.usage)}</td></tr>`).join('') + '</tbody></table>';
    return html;
  },
  papeis() {
    const roles = tokens.color.tokens.filter((t) => typeof t.value === 'object');
    const chip = (v) => `<span class="sw" style="background:${v}"></span><code>${v}</code>`;
    return '<div class="table-wrap"><table class="roles"><thead><tr><th>Token e uso</th><th>Tailwind</th><th>Claro</th><th>Escuro</th></tr></thead><tbody>' +
      roles.map((t) => `<tr><td><code>${t.name}</code><small>${esc(t.usage)}</small></td><td><code>${utilityName(t.name)}</code></td><td>${chip(light[t.name])}</td><td>${chip(dark[t.name])}</td></tr>`).join('') +
      '</tbody></table></div>';
  },
  tipografia() {
    return tokens.type.groups.map((g) => `<h3>${esc(g.name)}</h3>` + g.styles.map((s) =>
      `<div class="type-row"><div class="type-row__meta"><code>${s.name}</code><span>${s.fontSize} / ${s.lineHeight} · ${s.fontWeight}${s.letterSpacing ? ' · ' + s.letterSpacing : ''}</span><span>${esc(s.usage ?? '')}</span></div><div class="nc-${s.name}">${esc(s.sample ?? s.name)}</div></div>`,
    ).join('')).join('');
  },
  espacos() {
    return '<table><thead><tr><th>Token</th><th>Valor</th><th></th><th>Uso</th></tr></thead><tbody>' + tokens.spacing.tokens.map((t) =>
      `<tr><td><code>${t.name}</code></td><td><code>${t.value}</code></td><td><span class="bar" style="width:${t.value}"></span></td><td>${esc(t.usage)}</td></tr>`).join('') + '</tbody></table>';
  },
  raios() {
    const tw = { 'radius-sm': 'rounded-sm', 'radius-md': 'rounded-lg', 'radius-lg': 'rounded-xl', 'radius-xl': 'rounded-2xl', 'radius-full': 'rounded-full' };
    return '<div class="radii">' + tokens.radius.tokens.map((t) =>
      `<div class="radius"><span style="border-radius:${t.value}"></span><code>${t.name}</code><small>${t.value} · Tailwind <code>${tw[t.name]}</code></small><small>${esc(t.usage)}</small></div>`).join('') + '</div>';
  },
  sombras() {
    return '<div class="shadows">' + tokens.shadow.tokens.map((t) =>
      `<div class="shadow"><span style="box-shadow:var(--${t.name})"></span><code>${t.name}</code><small>${esc(t.usage)}</small></div>`).join('') + '</div>';
  },
  movimento() {
    return '<table><thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead><tbody>' + tokens.transition.tokens.map((t) =>
      `<tr><td><code>${t.name}</code></td><td><code>${t.value}</code></td><td>${esc(t.usage)}</td></tr>`).join('') + '</tbody></table>';
  },
  layout() {
    return '<table><thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead><tbody>' + tokens.layout.tokens.map((t) =>
      `<tr><td><code>${t.name}</code></td><td><code>${t.value}</code></td><td>${esc(t.usage)}</td></tr>`).join('') + '</tbody></table>';
  },
  contraste() {
    const pairs = [['text-primary', 'bg-page'], ['text-secondary', 'bg-surface'], ['link', 'bg-surface'], ['on-action-primary', 'action-primary'], ['on-action-accent', 'action-accent'], ['on-action-danger', 'action-danger'], ['table-header-text', 'table-header-bg'], ['focus-ring', 'bg-surface']];
    return '<table><thead><tr><th>Par</th><th>Claro</th><th>Escuro</th></tr></thead><tbody>' + pairs.map(([a, b]) =>
      `<tr><td><code>${a}</code> sobre <code>${b}</code></td><td>${ratio(light[a], light[b])}</td><td>${ratio(dark[a], dark[b])}</td></tr>`).join('') + '</tbody></table>';
  },
  logos() {
    const items = [
      ['novah-care-principal.svg', 'Principal', 'Fundos claros, a partir de 200px', 'light'],
      ['novah-care-principal-negativo.svg', 'Principal negativo', 'teal-900, sidebar, tema escuro', 'deep'],
      ['novah-care-compacta.svg', 'Compacta', 'De 96 a 199px, fundos claros', 'light'],
      ['novah-care-compacta-negativo.svg', 'Compacta negativo', 'De 96 a 199px, fundos escuros', 'deep'],
      ['novah-care-simbolo.svg', 'Símbolo', 'Abaixo de 96px', 'light'],
      ['novah-care-simbolo-pequeno.svg', 'Símbolo pequeno', 'De 16 a 47px (favicon)', 'light'],
      ['novah-care-principal-preto.svg', 'Preto', 'Impressão em uma cor', 'light'],
      ['novah-care-principal-branco.svg', 'Branco', 'Uma cor sobre fundo escuro', 'deep'],
    ];
    return '<div class="logos">' + items.map(([f, t, d, bg]) =>
      `<figure class="logo logo--${bg}"><div><img src="assets/brand/logo/${f}" alt="Novah Care, versão ${esc(t.toLowerCase())}"></div><figcaption><b>${t}</b>${d}<a href="assets/brand/logo/${f}" download>${f}</a></figcaption></figure>`).join('') + '</div>';
  },
};

// ---------- markdown ----------
const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text, lang }) {
      const [language, flag] = (lang ?? '').split(/\s+/);
      const code = `<pre><code class="language-${esc(language || 'text')}">${esc(text)}</code></pre>`;
      if (flag === 'exemplo') return `<div class="example"><div class="example__live">${text}</div>${code}</div>`;
      return code;
    },
    heading({ tokens: t, depth }) {
      const text = this.parser.parseInline(t);
      const id = text.replace(/<[^>]+>/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
  },
});

function render(p) {
  let html = marked.parse(p.body);
  html = html.replace(/<!--\s*constela:(\w+)\s*-->/g, (_, k) => {
    if (!blocks[k]) throw new Error(`Bloco desconhecido em ${p.file}: ${k}`);
    return blocks[k]();
  });
  html = html.replaceAll('{{versao}}', pkg.version);
  return html;
}

const nav = (current) => SECTIONS.map((s) => {
  const items = pages.filter((p) => p.section === s);
  if (!items.length) return '';
  return `<div class="nav__group"><p>${s}</p><ul>` + items.map((p) =>
    `<li><a href="${href(p)}"${p === current ? ' aria-current="page"' : ''}>${esc(p.title)}</a></li>`).join('') + '</ul></div>';
}).join('');

function layout(p, content) {
  const i = pages.indexOf(p);
  const prev = pages[i - 1];
  const next = pages[i + 1];
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} · Constela</title>
<meta name="description" content="${esc(p.description ?? 'Constela, o design system da Novah Care.')}">
<link rel="icon" href="assets/brand/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/brand/favicon/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="assets/brand/favicon/apple-touch-icon.png">
<link rel="stylesheet" href="assets/fonts.css">
<link rel="stylesheet" href="assets/tokens-auto.css">
<link rel="stylesheet" href="assets/components.css">
<link rel="stylesheet" href="assets/editorial.css">
<link rel="stylesheet" href="assets/site.css">
<script>try{var t=localStorage.getItem('constela-tema');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="top">
  <a class="top__brand" href="./"><img class="logo-light" src="assets/brand/logo/novah-care-compacta.svg" alt="Novah Care" width="112"><img class="logo-dark" src="assets/brand/logo/novah-care-compacta-negativo.svg" alt="" width="112"><span>Constela</span></a>
  <span class="top__version">v${pkg.version}</span>
  <nav class="top__links" aria-label="Links">
    <button class="theme-toggle" type="button" aria-label="Alternar tema claro e escuro">Tema</button>
    <a href="https://github.com/Novah-Care/constela">GitHub</a>
    <a href="https://www.npmjs.com/package/@novah-care/constela">npm</a>
  </nav>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
</header>
<div class="shell">
  <nav class="nav" id="nav" aria-label="Documentação">${nav(p)}</nav>
  <main id="conteudo" class="doc">
    <p class="doc__section">${esc(p.section)}</p>
    ${content}
    <nav class="pager" aria-label="Paginação">${prev ? `<a href="${href(prev)}"><small>Anterior</small>${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="pager__next" href="${href(next)}"><small>Próxima</small>${esc(next.title)}</a>` : ''}</nav>
    <footer class="foot">Constela ${pkg.version} · Código sob licença MIT · Marca Novah Care com todos os direitos reservados · <a href="https://github.com/Novah-Care/constela/edit/main/docs/${p.file}">Editar esta página</a></footer>
  </main>
</div>
<script src="assets/site.js"></script>
</body>
</html>
`;
}

for (const p of pages) writeFileSync(join(out, p.slug + '.html'), layout(p, render(p)));
writeFileSync(join(out, '.nojekyll'), '');
console.log(`site/ gerado: ${pages.length} páginas`);
