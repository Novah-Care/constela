---
title: HTML e Lovable
section: Início rápido
order: 3
description: Como usar o Constela em páginas HTML e em projetos gerados no Lovable.
---
# HTML e Lovable

## HTML puro

Uma linha traz fontes, tokens e componentes, direto do CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@novah-care/constela@{{versao}}/dist/index.css">
```

Fixe sempre a versão na URL. Depois, use as classes `nc-*`:

```html exemplo
<button class="nc-btn nc-btn--primary">Agendar exame</button>
<span class="nc-badge nc-badge--scheduled">Agendado</span>
```

Para seguir o tema escuro do sistema operacional, troque `index.css` por três arquivos: `fonts.css`, `tokens-auto.css` e `components.css`.

## Projetos no Lovable

Os projetos do Lovable usam Tailwind e shadcn/ui. O Constela tem um adaptador que liga as variáveis do shadcn/ui (`--primary`, `--background`, `--card`, `--radius` e as outras) aos tokens da marca. Com ele, os componentes que já existem no projeto mudam de uma vez.

### 1. Peça ao Lovable para instalar

Cole no chat do projeto:

> Instale o pacote npm `@novah-care/constela` e importe `@novah-care/constela/shadcn.css` no CSS global, depois de todas as variáveis do shadcn/ui. Remova as variáveis de cor e as fontes declaradas à mão no `:root` e no `.dark`. Não altere componentes.

### 2. Fixe as regras no Knowledge do projeto

Cole este texto nas instruções de conhecimento do projeto, para as próximas edições seguirem o Constela:

```text
Este projeto usa o design system Constela (@novah-care/constela).
- Cores: use só as classes do shadcn/ui (bg-primary, bg-background, text-muted-foreground, border-border) e bg-cta/text-cta-foreground para o botão de destaque. Nunca escreva cor em hexadecimal, rgb, hsl ou oklch.
- Fontes: font-heading (Plus Jakarta Sans) em títulos e botões, font-sans (DM Sans) no texto. Não importe outras fontes.
- Botão de destaque (CTA): no máximo um por tela, com bg-cta e text-cta-foreground.
- Logo: use os arquivos de https://cdn.jsdelivr.net/npm/@novah-care/constela@{{versao}}/dist/brand/logo/. Versão sem sufixo em fundo claro; "-negativo" em fundo escuro ou teal.
- Raios: rounded-lg em botões e inputs, rounded-xl em cards.
- Não crie novas variáveis de cor nem altere o tema.
```

### 3. Sites de leitura

Em bases de conhecimento e artigos, importe também `@novah-care/constela/editorial.css` e envolva o corpo do artigo em `<article class="nc-article">`. Veja [Tipografia](tipografia.html#leitura).

### Limitação

O adaptador funciona com o shadcn/ui na versão para Tailwind v4, em que as variáveis guardam a cor completa (`--primary: #0a7a7a`). Projetos antigos que guardam só os números do HSL (`--primary: 180 85% 26%`, usados como `hsl(var(--primary))`) precisam migrar para o formato novo antes.

## Mapeamento do adaptador

| Variável do shadcn/ui | Token do Constela |
| --- | --- |
| `--background` | `bg-page` |
| `--card`, `--popover` | `bg-surface` |
| `--foreground` | `text-primary` |
| `--muted-foreground` | `text-secondary` |
| `--primary` | `action-primary` |
| `--secondary`, `--accent` | `action-secondary` |
| `--destructive` | `action-danger` |
| `--border` | `border-default` |
| `--input` | `border-strong` |
| `--ring` | `focus-ring` |
| `--cta` (novo) | `action-accent` |
| `--chart-1` a `--chart-5` | séries de gráfico |
