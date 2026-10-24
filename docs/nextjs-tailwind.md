---
title: Next.js com Tailwind
section: Início rápido
order: 1
description: Como usar o Constela num projeto Next.js com Tailwind CSS v4.
---
# Next.js com Tailwind

Este guia vale para qualquer projeto com Tailwind CSS v4. O Constela entra no `@theme` do Tailwind: as classes que você já usa (`bg-teal-600`, `text-slate-500`) passam a pintar as cores da marca, e surgem classes novas para os papéis de cor.

## 1. Instale

```bash
npm install @novah-care/constela
```

## 2. Importe no CSS global

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@novah-care/constela/tailwind.css';
```

O arquivo já traz as fontes e as variáveis dos temas claro e escuro. Não declare cores da marca no seu próprio `@theme`: tudo vem do Constela.

## 3. Ative o tema escuro (opcional)

O tema escuro vale quando o elemento `html` tem a classe `dark` ou o atributo `data-theme="dark"`. Para o Tailwind entender o mesmo seletor:

```css
@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));
```

## 4. Use os papéis de cor

Prefira as classes de papel às escalas cruas. Elas mudam sozinhas no tema escuro.

| Em vez de | Use |
| --- | --- |
| `bg-white`, `bg-gray-50` | `bg-surface`, `bg-page` |
| `text-gray-900`, `text-gray-500` | `text-fg`, `text-fg-muted` |
| `border-gray-200` | `border-line` |
| `bg-teal-600 text-white` | `bg-action-primary text-on-action-primary` |
| `bg-amber-500 text-white` | `bg-action-accent text-on-action-accent` |
| `text-teal-600` (link) | `text-link hover:text-link-hover` |

```html
<button class="h-10 px-4 rounded-lg font-heading font-semibold bg-action-primary text-on-action-primary hover:bg-action-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
  Agendar exame
</button>
```

A lista completa de classes de papel está em [Cor](cor.html#papeis).

## O que muda num projeto existente

- `teal-*`, `primary-*` e `secondary-*` passam a usar as escalas da marca. `slate-*` e `gray-*` passam a usar os neutros da marca.
- `shadow-sm` a `shadow-xl` passam a usar as sombras da marca.
- A escala `rounded-*` não muda. A correspondência é: `rounded-sm` = `radius-sm`, `rounded-lg` = `radius-md`, `rounded-xl` = `radius-lg`, `rounded-2xl` = `radius-xl`.
- As fontes `font-sans`, `font-heading` e `font-serif` passam a ser DM Sans, Plus Jakarta Sans e Source Serif 4.

Revise as telas depois de importar: cores que eram do Tailwind padrão mudam de tom.
