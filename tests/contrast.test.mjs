// Garante que os pares de cor que o Constela promete passam no WCAG 2.1 AA nos dois temas.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolveTheme, contrast } from '../scripts/lib/tokens.mjs';

const tokens = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url), 'utf8'));

// [texto ou marca, fundo, mínimo]
const PAIRS = [
  ['text-primary', 'bg-page', 4.5],
  ['text-primary', 'bg-surface', 4.5],
  ['text-secondary', 'bg-page', 4.5],
  ['text-secondary', 'bg-surface', 4.5],
  ['text-error', 'bg-surface', 4.5],
  ['link', 'bg-page', 4.5],
  ['link', 'bg-surface', 4.5],
  ['on-action-primary', 'action-primary', 4.5],
  ['on-action-primary', 'action-primary-hover', 4.5],
  ['on-action-secondary', 'action-secondary', 4.5],
  ['on-action-accent', 'action-accent', 4.5],
  ['on-action-accent', 'action-accent-hover', 4.5],
  ['on-action-danger', 'action-danger', 4.5],
  ['table-header-text', 'table-header-bg', 4.5],
  ['text-on-dark', 'bg-sidebar', 4.5],
  ['teal-100', 'bg-sidebar', 4.5],
  ['selection-text', 'selection-bg', 4.5],
  ['success-text', 'success-soft', 4.5],
  ['warning-text', 'warning-soft', 4.5],
  ['error-text', 'error-soft', 4.5],
  ['info-text', 'info-soft', 4.5],
  ['scheduled-text', 'scheduled-soft', 4.5],
  ['inactive-text', 'inactive-soft', 4.5],
  ['tag-azul-text', 'tag-azul-soft', 4.5],
  ['tag-verde-text', 'tag-verde-soft', 4.5],
  ['tag-violeta-text', 'tag-violeta-soft', 4.5],
  ['tag-rosa-text', 'tag-rosa-soft', 4.5],
  ['tag-laranja-text', 'tag-laranja-soft', 4.5],
  ['tag-ciano-text', 'tag-ciano-soft', 4.5],
  ['tag-oliva-text', 'tag-oliva-soft', 4.5],
  ['tag-anil-text', 'tag-anil-soft', 4.5],
  ['tag-vermelho-text', 'tag-vermelho-soft', 4.5],
  ['focus-ring', 'bg-page', 3],
  ['focus-ring', 'bg-surface', 3],
  ['amber-400', 'bg-sidebar', 3],
];

for (const theme of tokens.color.themes.map((t) => t.id)) {
  const c = resolveTheme(tokens, theme);
  for (const [fg, bg, min] of PAIRS) {
    test(`${theme}: ${fg} sobre ${bg} >= ${min}:1`, () => {
      const ratio = contrast(c[fg], c[bg]);
      assert.ok(ratio >= min, `${fg} (${c[fg]}) sobre ${bg} (${c[bg]}) dá ${ratio.toFixed(2)}:1`);
    });
  }
}
