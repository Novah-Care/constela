// Utilidades compartilhadas pelo build, pelo site e pelos testes.

export const CHART_KEYS = ['chart-1', 'chart-2', 'chart-3', 'chart-4'];

/** Valor bruto de um token de cor num tema (string), ou undefined. Tema ausente herda o primeiro. */
function raw(token, theme, firstTheme) {
  const v = token.value;
  if (typeof v === 'string') return v;
  return v[theme] ?? v[firstTheme];
}

/** Resolve todos os tokens de cor de um tema para valores finais (aliases {x} seguidos até o fim). */
export function resolveTheme(tokens, theme) {
  const firstTheme = tokens.color.themes[0].id;
  const byName = new Map(tokens.color.tokens.map((t) => [t.name, t]));
  const resolve = (name, depth = 0) => {
    if (depth > 16) throw new Error(`Alias em ciclo: ${name}`);
    const t = byName.get(name);
    if (!t) throw new Error(`Alias para token inexistente: ${name}`);
    const v = raw(t, theme, firstTheme);
    const m = /^\{(.+)\}$/.exec(v);
    return m ? resolve(m[1], depth + 1) : v.toLowerCase();
  };
  return Object.fromEntries(tokens.color.tokens.map((t) => [t.name, resolve(t.name)]));
}

/** Luminância relativa (WCAG 2) de #rrggbb. */
export function luminance(hex) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** Razão de contraste entre duas cores #rrggbb. */
export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
