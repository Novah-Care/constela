---
title: Tipografia
section: Fundamentos
order: 2
description: Famílias, escala tipográfica e padrão de leitura.
---
# Tipografia

**Plus Jakarta Sans** em títulos, navegação, botões e header de tabela. **DM Sans** em texto, labels, inputs e células. **Source Serif 4** só no corpo de artigos longos, em sites de leitura.

As três fontes vêm no pacote (subset latino, cobre todos os acentos do português) e são servidas do próprio site, sem depender do Google Fonts.

| Variável | Família | Pesos |
| --- | --- | --- |
| `--font-heading` | Plus Jakarta Sans | 500 a 800 |
| `--font-sans` | DM Sans | 400 a 700 |
| `--font-serif` | Source Serif 4 | 200 a 900, com itálico |

## Escala

Cada estilo também existe como classe: `.nc-display-lg`, `.nc-body-md` e assim por diante.

<!-- constela:tipografia -->

## Regras

- `display-lg` só no hero do site e em capas. Um por página.
- `display-sm` no título da página nos portais.
- `body-md` (14px) é o padrão de interface; `body-lg` (16px) é o padrão de leitura.
- `overline` sempre em caixa alta, com espaçamento de 0.05em.
- Use caixa de frase em títulos, botões e menus: "Agendar exame", não "Agendar Exame".
- Não use outras famílias. Arial é aceito só como fallback e em documentos DOCX.

## Leitura

Sites de leitura (base de conhecimento, artigos, blog) usam o `editorial.css`. O corpo do artigo vai em Source Serif 4, 18/30, numa coluna de no máximo 68 caracteres. Títulos, metadados, tabelas e interface continuam na fonte da marca.

```html exemplo
<article class="nc-article">
  <p class="nc-article__meta">Atualizado em 24/10/2026 · 6 min de leitura</p>
  <h2>O que o PCMSO precisa ter</h2>
  <p class="nc-article__lead">O programa define quais exames cada função faz e com que frequência.</p>
  <p>A NR-7 estabelece a obrigatoriedade do Programa de Controle Médico de Saúde Ocupacional para toda empresa com empregados registrados. O documento é elaborado por médico do trabalho e revisado sempre que os riscos mudam.</p>
  <blockquote>O exame periódico acompanha a saúde de quem já está na função.</blockquote>
</article>
```
