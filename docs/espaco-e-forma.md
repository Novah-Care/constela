---
title: Espaço e forma
section: Fundamentos
order: 3
description: Espaçamento, grid, raios e elevação.
---
# Espaço e forma

## Espaçamento

Unidade base de 4px. Todo espaço é múltiplo dela. Na classe do Tailwind, o número é o mesmo: `space-4` = `p-4` = 16px.

<!-- constela:espacos -->

## Grid e layout

- **Desktop (1280px ou mais):** container de até 1280px, 12 colunas, gutter de 24px, sidebar fixa de 256px.
- **Tablet (768 a 1279px):** container fluido, 8 colunas, gutter de 20px, sidebar recolhível.
- **Mobile (até 767px):** container fluido, 4 colunas, gutter de 16px, navegação inferior.

<!-- constela:layout -->

## Raios

<!-- constela:raios -->

- 8px (`radius-md`) em botões e inputs, de todos os tamanhos.
- 12px (`radius-lg`) em cards, modais e popovers.
- Badges de status e avatares são pílulas (`radius-full`).

## Elevação

A separação vem principalmente das bordas (`border-default`). Sombra é discreta.

<!-- constela:sombras -->

- `shadow-sm` em repouso, `shadow-md` em hover e menus, `shadow-lg` em modais, `shadow-xl` em drawers.
