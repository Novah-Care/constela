// Confere que o build gera os arquivos exportados e que nenhum valor solto escapa dos tokens.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const dist = (f) => new URL(`../${f.replace(/^\.\//, '')}`, import.meta.url);

test('todo arquivo exportado existe em dist/', () => {
  for (const [key, target] of Object.entries(pkg.exports)) {
    const file = typeof target === 'string' ? target : target.default;
    if (file.includes('*')) continue;
    assert.ok(existsSync(dist(file)), `${key} -> ${file} não existe; rode npm run build`);
  }
});

test('components.css e editorial.css não declaram cor hexadecimal solta', () => {
  for (const f of ['src/components.css', 'src/editorial.css']) {
    const css = readFileSync(dist(f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    assert.equal(css.match(/#[0-9a-f]{3,8}\b/gi), null, `${f} tem hexadecimal solto`);
  }
});

test('tokens.js resolve as cores dos dois temas', async () => {
  const { color, chartColors } = await import('../dist/tokens.js');
  assert.match(color('action-primary', 'light'), /^#[0-9a-f]{6}$/);
  assert.match(color('action-primary', 'dark'), /^#[0-9a-f]{6}$/);
  assert.equal(chartColors('light').length, 4);
  assert.throws(() => color('nao-existe'));
});

test('tokens-core.css não redefine a escala de raios do Tailwind', () => {
  const css = readFileSync(dist('dist/tokens-core.css'), 'utf8');
  assert.equal(/--radius-(sm|md|lg|xl)\s*:/.test(css), false);
});
