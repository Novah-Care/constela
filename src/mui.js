// Tema do Material UI (v5 a v7) com os tokens do Constela.
// Uso: import { createNovahTheme } from '@novah-care/constela/mui';
//      const theme = createNovahTheme('light');

import { createTheme } from '@mui/material/styles';

const T = /* __TOKENS__ */ null;

const ptToRem = (px) => `${parseFloat(px) / 16}rem`;

function textStyle(name, extra = {}) {
  const s = T.styles[name];
  return {
    fontFamily: T.families[s.family],
    fontSize: ptToRem(s.fontSize),
    lineHeight: ptToRem(s.lineHeight),
    fontWeight: s.fontWeight,
    ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}),
    ...extra,
  };
}

/** Opções de tema (objeto puro), para quem quer combinar com as próprias antes do createTheme. */
export function getNovahThemeOptions(mode = 'light') {
  const c = T.colors[mode] ?? T.colors.light;
  const light = mode !== 'dark';
  const focusRing = { outline: `2px solid ${c['focus-ring']}`, outlineOffset: '2px' };
  const shadows = [
    'none',
    T.shadow['shadow-sm'], T.shadow['shadow-sm'],
    T.shadow['shadow-md'], T.shadow['shadow-md'], T.shadow['shadow-md'], T.shadow['shadow-md'],
    ...Array(8).fill(T.shadow['shadow-lg']),
    ...Array(10).fill(T.shadow['shadow-xl']),
  ];

  return {
    breakpoints: { values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 } },
    palette: {
      mode: light ? 'light' : 'dark',
      primary: { main: c['action-primary'], light: light ? c['teal-600'] : c['teal-300'], dark: c['action-primary-hover'], contrastText: c['on-action-primary'] },
      secondary: { main: c['action-accent'], light: c['amber-300'], dark: c['action-accent-hover'], contrastText: c['on-action-accent'] },
      warning: { main: c['warning'], light: c['amber-300'], dark: c['amber-700'], contrastText: c['neutral-900'] },
      error: { main: c['action-danger'], light: '#f87171', dark: c['error-text'], contrastText: c['on-action-danger'] },
      success: { main: c['success'], light: '#34d399', dark: c['success-text'], contrastText: c['neutral-900'] },
      info: { main: c['info'], light: '#60a5fa', dark: c['info-text'], contrastText: c['neutral-900'] },
      background: { default: c['bg-page'], paper: c['bg-surface'] },
      text: { primary: c['text-primary'], secondary: c['text-secondary'], disabled: c['text-disabled'] },
      divider: c['border-default'],
      grey: Object.fromEntries(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((k) => [k, c[`neutral-${k}`]])),
      action: {
        active: light ? c['neutral-600'] : c['neutral-400'],
        hover: light ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
        selected: light ? c['teal-50'] : 'rgba(255, 255, 255, 0.12)',
        disabled: light ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
        disabledBackground: light ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      },
    },
    typography: {
      fontFamily: T.families.sans,
      h1: textStyle('display-lg'),
      h2: textStyle('display-sm'),
      h3: textStyle('heading-lg'),
      h4: textStyle('heading-md'),
      h5: textStyle('heading-sm'),
      h6: { ...textStyle('heading-sm'), fontSize: '0.875rem', lineHeight: '1.25rem' },
      subtitle1: textStyle('body-lg', { fontWeight: 500 }),
      subtitle2: textStyle('label'),
      body1: textStyle('body-lg'),
      body2: textStyle('body-md'),
      caption: textStyle('body-sm'),
      overline: textStyle('overline', { textTransform: 'uppercase' }),
      button: textStyle('button-md', { textTransform: 'none' }),
    },
    shape: { borderRadius: 8 },
    shadows,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { WebkitFontSmoothing: 'antialiased' },
          'h1, h2, h3, h4, h5, h6': { fontFamily: T.families.heading },
          '::selection': { backgroundColor: c['selection-bg'], color: c['selection-text'] },
        },
      },
      MuiButtonBase: { styleOverrides: { root: { '&.Mui-focusVisible': focusRing } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 8, minHeight: 40, padding: '8px 16px', transition: 'all 150ms ease-in-out' },
          sizeSmall: { minHeight: 32, padding: '6px 12px', fontSize: '0.75rem' },
          sizeLarge: { minHeight: 48, padding: '12px 24px', fontSize: '1rem' },
          outlined: { borderColor: c['border-strong'] },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            minHeight: 40,
            backgroundColor: c['bg-surface'],
            '& .MuiOutlinedInput-notchedOutline': { borderColor: c['border-default'] },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: c['border-strong'] },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: c['border-focus'], borderWidth: 1, boxShadow: `0 0 0 3px ${c['focus-halo']}` },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: c['error'] },
          },
        },
      },
      MuiFormHelperText: { styleOverrides: { root: { marginLeft: 0, '&.Mui-error': { color: c['text-error'] } } } },
      MuiInputLabel: { styleOverrides: { root: { '&.Mui-focused': { color: c['link'] } } } },
      MuiLink: { defaultProps: { underline: 'hover' }, styleOverrides: { root: { color: c['link'], '&:hover': { color: c['link-hover'] } } } },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: { root: { borderRadius: 12, border: `1px solid ${c['border-default']}`, boxShadow: T.shadow['shadow-sm'] } },
      },
      MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiDialog: { styleOverrides: { paper: { borderRadius: 12, backgroundColor: c['bg-surface'], boxShadow: T.shadow['shadow-lg'] } } },
      MuiChip: { styleOverrides: { root: { borderRadius: 9999, fontWeight: 500 } } },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: `1px solid ${c['border-default']}` },
          head: {
            fontFamily: T.families.heading,
            fontWeight: 600,
            fontSize: '0.75rem',
            lineHeight: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            backgroundColor: c['table-header-bg'],
            color: c['table-header-text'],
          },
        },
      },
      MuiTableRow: { styleOverrides: { root: { '&:hover': { backgroundColor: c['table-row-hover'] } } } },
      MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: c['neutral-900'], fontSize: '0.75rem' } } },
    },
  };
}

/** Tema pronto. `overrides` é mesclado por cima das opções do Constela. */
export function createNovahTheme(mode = 'light', overrides = {}) {
  return createTheme(getNovahThemeOptions(mode), overrides);
}

/** Cores resolvidas do tema, para gráficos e componentes que não usam o palette. */
export const novahColors = (mode = 'light') => T.colors[mode] ?? T.colors.light;

export default createNovahTheme;
