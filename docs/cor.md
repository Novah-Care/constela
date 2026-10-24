---
title: Cor
section: Fundamentos
order: 1
description: Escalas da marca, papéis de cor e tema escuro.
---
# Cor

Teal é a marca. Âmbar é ação e atenção. Neutros frios sustentam texto, bordas e fundos. As cores de status existem só para feedback do sistema.

## Duas camadas

O Constela tem duas camadas de cor:

1. **Escalas**: os valores da marca (`teal-50` a `teal-950`, `amber-50` a `amber-950`, `neutral-0` a `neutral-950`) e as cores de status. São fixas.
2. **Papéis**: nomes pela função (`bg-surface`, `text-secondary`, `action-primary`, `link`). Cada papel aponta para um tom da escala no tema claro e para outro no escuro.

Nos componentes, use sempre os papéis. A escala crua fica para ilustração, gráfico e casos documentados.

## Papéis

<!-- constela:papeis -->

A coluna Tailwind traz o nome da classe quando você usa o `tailwind.css`: `bg-surface`, `text-fg-muted`, `border-line`, `bg-action-primary`.

## Escalas

<!-- constela:escalas -->

## Regras

- `teal-500` é o teal do logotipo. Use em ícones, ilustrações e gráficos, nunca como fundo de texto ou como texto.
- `teal-600` é o teal de interface do v1.0. Com texto branco dá 2,99:1, abaixo do AA: use como mancha (ícone, ponto de status, série de gráfico).
- A ação primária e os links usam `teal-800` no tema claro.
- Texto sobre âmbar é sempre escuro (`on-action-accent`), nunca branco.
- Cada cor de status tem três tons: a base (ponto, ícone, borda), `-soft` (fundo) e `-text` (texto sobre o fundo). A base nunca é usada como texto.
- No máximo um CTA âmbar por tela.

## Tema escuro

Os papéis já têm valor para o tema escuro. Ele vale quando o `html` tem a classe `dark` ou o atributo `data-theme="dark"`. Para seguir a preferência do sistema operacional, use `tokens-auto.css` no lugar de `tokens.css`.

No escuro, a ação primária vira `teal-400` com texto escuro, e a superfície vira `neutral-900` sobre fundo `neutral-950`. Os fundos dos badges de status continuam claros, por isso o texto deles não muda.

## Ajustes em relação ao v1.0

A versão 1.0 do guia definia o botão primário e o link em `teal-600` e o CTA em `amber-500` com texto branco. Esses pares ficam em 2,99:1 e 2,15:1. O Constela manteve as escalas e mudou o papel de cada tom: ação primária em `teal-800`, CTA com texto escuro, botão de perigo em `#dc2626` e anel de foco em `teal-700`.
