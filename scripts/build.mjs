// Gera tudo o que está em dist/ a partir de tokens/tokens.json.
// Sem dependências: rode com `node scripts/build.mjs`.

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveTheme, CHART_KEYS } from './lib/tokens.mjs';
import { utilityName } from './lib/names.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const banner = `/* @novah-care/constela ${pkg.version}. Gerado a partir de tokens/tokens.json: não edite à mão. */\n`;
const write = (file, content) => writeFileSync(join(dist, file), content);

const themes = tokens.color.themes.map((t) => t.id); // ['light', 'dark']
const [first, ...others] = themes;
const aliasToVar = (v) => v.replace(/^\{(.+)\}$/, 'var(--$1)');
const valueFor = (token, theme) => (typeof token.value === 'string' ? token.value : token.value[theme]);

// ---------- tokens.css ----------
function tokensCss({ radius = true } = {}) {
  const lines = [banner];
  lines.push(':root {');
  for (const t of tokens.color.tokens) {
    const v = valueFor(t, first);
    if (v) lines.push(`  --${t.name}: ${aliasToVar(v)};`);
  }
  for (const fam of ['shadow', 'spacing', ...(radius ? ['radius'] : []), 'layout', 'transition', 'opacity']) {
    for (const t of tokens[fam].tokens) lines.push(`  --${t.name}: ${t.value};`);
  }
  for (const [key, stack] of Object.entries(tokens.type.families)) lines.push(`  --font-${key}: ${stack};`);
  lines.push('  color-scheme: light;');
  lines.push('}', '');
  for (const theme of others) {
    lines.push(`.${theme}, [data-theme="${theme}"] {`);
    for (const t of tokens.color.tokens) {
      if (typeof t.value === 'string') continue;
      const v = t.value[theme];
      if (v) lines.push(`  --${t.name}: ${aliasToVar(v)};`);
    }
    lines.push(`  color-scheme: ${theme};`);
    lines.push('}', '');
  }
  lines.push(`/* Tema escuro automático pela preferência do sistema: importe tokens-auto.css no lugar deste arquivo. */`, '');
  return lines.join('\n');
}

function tokensAutoCss() {
  // Mesmo conteúdo, mas o escuro também vale quando o sistema pede, a menos que a página force o claro.
  const css = tokensCss();
  const darkBlock = css.slice(css.indexOf('.dark, [data-theme="dark"] {'));
  const body = darkBlock.slice(darkBlock.indexOf('{') + 1, darkBlock.indexOf('}'));
  return css + `@media (prefers-color-scheme: dark) {\n  :root:not(.light):not([data-theme="light"]) {${body}  }\n}\n`;
}

// ---------- fonts.css ----------
function fontsCss() {
  const lines = [banner];
  for (const f of tokens.type.fonts) {
    const file = f.file.replace(/^fonts\//, '');
    lines.push(
      '@font-face {',
      `  font-family: '${f.family}';`,
      `  src: url('./fonts/${file}') format('woff2');`,
      `  font-weight: ${f.weight};`,
      `  font-style: ${f.style ?? 'normal'};`,
      '  font-display: swap;',
      '  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;',
      '}',
      '',
    );
  }
  return lines.join('\n');
}

// ---------- typography.css (classes de estilo de texto) ----------
function typographyCss() {
  const lines = [];
  for (const g of tokens.type.groups) {
    for (const s of g.styles) {
      const fam = s.family ?? g.family;
      lines.push(`.nc-${s.name} {`);
      lines.push(`  font-family: var(--font-${fam});`);
      lines.push(`  font-size: ${s.fontSize};`);
      lines.push(`  line-height: ${s.lineHeight};`);
      lines.push(`  font-weight: ${s.fontWeight};`);
      if (s.letterSpacing) lines.push(`  letter-spacing: ${s.letterSpacing};`);
      if (s.fontStyle) lines.push(`  font-style: ${s.fontStyle};`);
      if (s.name === 'overline') lines.push('  text-transform: uppercase;');
      lines.push('}');
    }
  }
  return lines.join('\n') + '\n';
}

// ---------- tailwind.css (Tailwind CSS v4) ----------
function tailwindCss() {
  const scale = (prefix) => tokens.color.tokens.filter((t) => new RegExp(`^${prefix}-\\d+$`).test(t.name));
  const lines = [banner, `@import './tokens-core.css';`, `@import './fonts.css';`, '', '@theme {'];
  lines.push('  /* Escalas da marca */');
  for (const t of scale('teal')) lines.push(`  --color-teal-${t.name.split('-')[1]}: ${t.value};`);
  for (const t of scale('amber')) lines.push(`  --color-amber-${t.name.split('-')[1]}: ${t.value};`);
  for (const t of scale('neutral')) lines.push(`  --color-neutral-${t.name.split('-')[1]}: ${t.value};`);
  lines.push('', '  /* primary e secondary apontam para teal e amber (nomes usados em projetos existentes) */');
  for (const t of scale('teal')) lines.push(`  --color-primary-${t.name.split('-')[1]}: ${t.value};`);
  for (const t of scale('amber')) lines.push(`  --color-secondary-${t.name.split('-')[1]}: ${t.value};`);
  lines.push('', '  /* slate e gray do Tailwind passam a ser os neutros da marca */');
  for (const t of scale('neutral')) {
    const step = t.name.split('-')[1];
    if (step === '0') continue;
    lines.push(`  --color-slate-${step}: ${t.value};`);
    lines.push(`  --color-gray-${step}: ${t.value};`);
  }
  lines.push('', '  /* Status */');
  for (const t of tokens.color.tokens.filter((t) => /^(success|warning|error|info|scheduled)(-|$)/.test(t.name))) {
    lines.push(`  --color-${t.name}: ${t.value};`);
  }
  lines.push('', '  /* Tags de categoria */');
  for (const t of tokens.color.tokens.filter((t) => t.name.startsWith('tag-'))) {
    lines.push(`  --color-${t.name}: ${t.value};`);
  }
  lines.push('', '  /* Fontes */');
  lines.push(`  --font-sans: ${tokens.type.families.sans};`);
  lines.push(`  --font-heading: ${tokens.type.families.heading};`);
  lines.push(`  --font-serif: ${tokens.type.families.serif};`);
  lines.push('', '  /* Sombras da marca. Raios: a escala padrão do Tailwind já bate (rounded-sm = radius-sm,');
  lines.push('     rounded-lg = radius-md, rounded-xl = radius-lg, rounded-2xl = radius-xl), por isso não é redefinida. */');
  for (const t of tokens.shadow.tokens) lines.push(`  --${t.name}: ${t.value};`);
  lines.push('}', '');
  lines.push('/* Papéis: mudam sozinhos no tema escuro. Ex.: bg-surface, text-fg-muted, border-line, bg-action-primary. */');
  lines.push('@theme inline {');
  for (const t of tokens.color.tokens.filter((t) => typeof t.value === 'object')) {
    lines.push(`  --color-${utilityName(t.name)}: var(--${t.name});`);
  }
  lines.push('}', '');
  return lines.join('\n');
}

// ---------- shadcn.css (projetos com shadcn/ui, incluindo os gerados no Lovable) ----------
function shadcnCss() {
  const map = {
    background: 'bg-page',
    foreground: 'text-primary',
    card: 'bg-surface',
    'card-foreground': 'text-primary',
    popover: 'bg-surface',
    'popover-foreground': 'text-primary',
    primary: 'action-primary',
    'primary-foreground': 'on-action-primary',
    secondary: 'action-secondary',
    'secondary-foreground': 'on-action-secondary',
    muted: 'bg-subtle',
    'muted-foreground': 'text-secondary',
    accent: 'action-secondary',
    'accent-foreground': 'on-action-secondary',
    destructive: 'action-danger',
    'destructive-foreground': 'on-action-danger',
    border: 'border-default',
    input: 'border-strong',
    ring: 'focus-ring',
    cta: 'action-accent',
    'cta-foreground': 'on-action-accent',
    'chart-1': 'chart-1',
    'chart-2': 'chart-2',
    'chart-3': 'chart-3',
    'chart-4': 'chart-4',
    'chart-5': 'teal-900',
    sidebar: 'bg-surface',
    'sidebar-foreground': 'text-primary',
    'sidebar-primary': 'action-primary',
    'sidebar-primary-foreground': 'on-action-primary',
    'sidebar-accent': 'action-secondary',
    'sidebar-accent-foreground': 'on-action-secondary',
    'sidebar-border': 'border-default',
    'sidebar-ring': 'focus-ring',
  };
  const lines = [banner, `@import './tokens-core.css';`, `@import './fonts.css';`, ''];
  lines.push('/* As variáveis do shadcn/ui apontam para os papéis do Constela. Como os papéis já mudam em .dark,');
  lines.push('   o tema escuro funciona sem um segundo bloco. Importe depois do CSS gerado pelo shadcn. */');
  lines.push(':root, .dark, [data-theme="dark"] {');
  for (const [k, v] of Object.entries(map)) lines.push(`  --${k}: var(--${v});`);
  lines.push('  --radius: 0.5rem;');
  lines.push('}', '');
  lines.push('@theme inline {');
  lines.push('  --color-cta: var(--cta);');
  lines.push('  --color-cta-foreground: var(--cta-foreground);');
  lines.push(`  --font-sans: ${tokens.type.families.sans};`);
  lines.push(`  --font-heading: ${tokens.type.families.heading};`);
  lines.push(`  --font-serif: ${tokens.type.families.serif};`);
  lines.push('}', '');
  lines.push(baseCss());
  return lines.join('\n');
}

function baseCss() {
  return `/* Base: fontes, seleção e foco */
body { font-family: var(--font-sans); background: var(--bg-page); color: var(--text-primary); -webkit-font-smoothing: antialiased; }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }
::selection { background: var(--selection-bg); color: var(--selection-text); }
:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
`;
}

// ---------- components.css ----------
function componentsCss() {
  const src = readFileSync(join(root, 'src/components.css'), 'utf8');
  return banner + src + '\n/* Estilos de texto */\n' + typographyCss();
}

// ---------- index.css (tudo para HTML puro) ----------
function indexCss() {
  return [banner, `@import './fonts.css';`, `@import './tokens.css';`, `@import './components.css';`, ''].join('\n');
}

// ---------- tokens.js / tokens.d.ts ----------
function tokensJs() {
  const resolved = Object.fromEntries(themes.map((th) => [th, resolveTheme(tokens, th)]));
  const flat = (fam) => Object.fromEntries(tokens[fam].tokens.map((t) => [t.name, t.value]));
  const out = {
    colors: resolved,
    spacing: flat('spacing'),
    radius: flat('radius'),
    shadow: flat('shadow'),
    layout: flat('layout'),
    transition: flat('transition'),
    fontFamily: tokens.type.families,
    textStyles: Object.fromEntries(tokens.type.groups.flatMap((g) => g.styles.map(({ name, ...s }) => [name, { ...s, family: s.family ?? g.family }]))),
  };
  return `${banner.replace('/*', '//').replace(' */', '')}
export const tokens = ${JSON.stringify(out, null, 2)};

/** Cor resolvida (hexadecimal ou rgba) de um token, no tema pedido. */
export function color(name, theme = 'light') {
  const value = tokens.colors[theme]?.[name];
  if (value === undefined) throw new Error(\`Token de cor desconhecido: \${name}\`);
  return value;
}

/** Referência CSS ao token, para usar em estilos que acompanham o tema: cssVar('bg-surface') -> 'var(--bg-surface)'. */
export const cssVar = (name) => \`var(--\${name})\`;

/** Cores de série para gráficos, na ordem de uso. */
export const chartColors = (theme = 'light') => ${JSON.stringify(CHART_KEYS)}.map((k) => tokens.colors[theme][k]);

export default tokens;
`;
}

function tokensDts() {
  const names = tokens.color.tokens.map((t) => `'${t.name}'`).join(' | ');
  return `export type ThemeName = ${themes.map((t) => `'${t}'`).join(' | ')};
export type ColorToken = ${names};
export interface TextStyle { family: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string; fontStyle?: string; sample?: string; usage?: string }
export interface ConstelaTokens {
  colors: Record<ThemeName, Record<ColorToken, string>>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  layout: Record<string, string>;
  transition: Record<string, string>;
  fontFamily: Record<'heading' | 'sans' | 'serif', string>;
  textStyles: Record<string, TextStyle>;
}
export declare const tokens: ConstelaTokens;
export declare function color(name: ColorToken, theme?: ThemeName): string;
export declare function cssVar(name: ColorToken | string): string;
export declare function chartColors(theme?: ThemeName): string[];
export default tokens;
`;
}

// ---------- mui.js / mui.d.ts ----------
function muiJs() {
  const src = readFileSync(join(root, 'src/mui.js'), 'utf8');
  const resolved = Object.fromEntries(themes.map((th) => [th, resolveTheme(tokens, th)]));
  const data = {
    colors: resolved,
    families: tokens.type.families,
    styles: Object.fromEntries(tokens.type.groups.flatMap((g) => g.styles.map((s) => [s.name, { ...s, family: s.family ?? g.family }]))),
    shadow: Object.fromEntries(tokens.shadow.tokens.map((t) => [t.name, t.value])),
  };
  return banner.replace('/*', '//').replace(' */', '') + src.replace('/* __TOKENS__ */ null', JSON.stringify(data, null, 2));
}

// ---------- escrita ----------
write('tokens.css', tokensCss());
write('tokens-auto.css', tokensAutoCss());
// Para Tailwind e shadcn: sem --radius-*, que colidiria com a escala rounded-* do Tailwind.
write('tokens-core.css', tokensCss({ radius: false }).replace(banner, banner + '/* Igual a tokens.css, sem --radius-*: usado por tailwind.css e shadcn.css. */\n'));
write('fonts.css', fontsCss());
write('components.css', componentsCss());
write('editorial.css', banner + readFileSync(join(root, 'src/editorial.css'), 'utf8'));
write('tailwind.css', tailwindCss());
write('shadcn.css', shadcnCss());
write('index.css', indexCss());
write('tokens.js', tokensJs());
write('tokens.d.ts', tokensDts());
write('mui.js', muiJs());
write('mui.d.ts', readFileSync(join(root, 'src/mui.d.ts'), 'utf8'));
writeFileSync(join(dist, 'tokens.json'), JSON.stringify(tokens, null, 2));
cpSync(join(root, 'fonts'), join(dist, 'fonts'), { recursive: true });
cpSync(join(root, 'brand'), join(dist, 'brand'), { recursive: true });

console.log(`dist/ gerado: ${readdirSync(dist).join(', ')}`);
