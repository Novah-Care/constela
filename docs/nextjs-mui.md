---
title: Next.js com Material UI
section: Início rápido
order: 2
description: Como usar o tema do Constela no Material UI.
---
# Next.js com Material UI

O Constela traz um tema pronto para o Material UI (versões 5 a 7), com paleta, tipografia, sombras e ajustes de botão, input, card, diálogo, chip e tabela.

## 1. Instale

```bash
npm install @novah-care/constela
```

O pacote usa o `@mui/material` que o seu projeto já tem.

## 2. Crie o tema

```tsx
// src/theme/ThemeRegistry.tsx
'use client';
import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createNovahTheme } from '@novah-care/constela/mui';
import '@novah-care/constela/fonts.css';

export default function ThemeRegistry({ children, mode = 'light' }: { children: React.ReactNode; mode?: 'light' | 'dark' }) {
  const theme = React.useMemo(() => createNovahTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

## 3. Ajustes do projeto

Passe o que for específico do projeto no segundo argumento. Ele é mesclado por cima do Constela:

```ts
const theme = createNovahTheme('light', {
  components: { MuiDataGrid: { styleOverrides: { root: { border: 0 } } } },
});
```

Não sobrescreva `palette`, `typography` ou `shape` no projeto. Se um valor do Constela não serve, abra uma proposta no repositório.

## 4. Cores fora do palette

Para gráficos e estilos que não passam pelo palette, use as cores resolvidas:

```ts
import { novahColors } from '@novah-care/constela/mui';
import { chartColors } from '@novah-care/constela';

const c = novahColors(theme.palette.mode);
const series = chartColors(theme.palette.mode); // [principal, destaque, secundária, comparação]
```

## Com Tailwind no mesmo projeto

Se o projeto usa Material UI e Tailwind juntos, importe também o `tailwind.css` (veja [Next.js com Tailwind](nextjs-tailwind.html)). Os dois leem os mesmos tokens.

## Mapeamento do palette

| palette | Claro | Escuro |
| --- | --- | --- |
| `primary.main` | `action-primary` (teal-800) | `action-primary` (teal-400) |
| `secondary.main` | `action-accent` (amber-500), texto escuro | `action-accent` (amber-400) |
| `error.main` | `action-danger` (#dc2626) | `action-danger` (#f87171) |
| `background.default` | `bg-page` | `bg-page` |
| `background.paper` | `bg-surface` | `bg-surface` |
| `text.secondary` | `text-secondary` | `text-secondary` |
| `divider` | `border-default` | `border-default` |
