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

### 1. Levante o que o projeto já usa

Antes de pedir a instalação, liste no CSS publicado do site (ou no `index.css` do projeto):

- as variáveis próprias além das do shadcn/ui (por exemplo `--ink`, `--amber`, `--surface`) e as classes que dependem delas (`text-ink`, `bg-amber`);
- todos os lugares em que o logo aparece, **inclusive estados que trocam a imagem**, como o header que fica branco ao rolar a página;
- textos coloridos sobre fundo escuro (selos, números, rótulos).

Essas variáveis **não devem ser removidas**: elas passam a apontar para os tokens do Constela. Remover quebra as classes que dependem delas.

### 2. Peça ao Lovable para instalar

Adapte e cole no chat do projeto:

```text
Instale o pacote npm @novah-care/constela, na versão fixa {{versao}}.

1. No CSS global, importe @novah-care/constela/shadcn.css DEPOIS do bloco @theme inline
   e das variáveis de :root e .dark do projeto. Confira a ordem no CSS gerado.
2. No :root do projeto, faça as variáveis do shadcn/ui apontarem para o Constela:
   --primary: var(--action-primary); --ring: var(--focus-ring).
3. Não remova variáveis próprias do projeto: aponte cada uma para um token
   (ex.: --ink: var(--neutral-900); --amber: var(--amber-500); --surface-deep: var(--teal-900)).
   Remova só variáveis com o mesmo nome de um token do Constela (ex.: --teal-900).
4. Fontes: remova Arial e outras famílias. font-heading em títulos, botões e navegação;
   font-sans no restante.
5. Troque todos os logos pelos arquivos do Constela, inclusive em estados alternativos
   (header rolado, menu móvel): versão sem sufixo em fundo claro, "-negativo" em fundo escuro.
   Remova os arquivos de logo antigos do projeto.
6. Troque o favicon pelos arquivos de dist/brand/favicon/.
Não altere textos, seções, layout nem componentes além do que está acima.
```

O Lovable às vezes coloca o import antes das variáveis do projeto. Nesse caso, o passo 2 garante que botões e links usem a cor certa mesmo assim.

### 3. Revise depois de publicar

- Abra o site, role até o fim e confira o logo em todos os estados do header.
- Procure selos e números coloridos sobre fundo teal escuro: sobre `teal-900`, use `text-teal-200` (não `text-primary`) e `text-amber-400` (não `text-amber`); texto claro com transparência no mínimo `/75`.
- Confira cards claros dentro de seções escuras: o texto precisa de `text-foreground`, senão herda o branco da seção.
- Rode uma verificação de contraste (Lighthouse ou axe) e corrija o que ficar abaixo de 4,5:1.

### 4. Fixe as regras no Knowledge do projeto

Cole este texto nas instruções de conhecimento do projeto, para as próximas edições seguirem o Constela:

```text
Este projeto usa o design system Constela (@novah-care/constela).
- Cores: use só as classes do shadcn/ui (bg-primary, bg-background, text-muted-foreground, border-border) e bg-cta/text-cta-foreground para o botão de destaque. Nunca escreva cor em hexadecimal, rgb, hsl ou oklch.
- Fontes: font-heading (Plus Jakarta Sans) em títulos e botões, font-sans (DM Sans) no texto. Não importe outras fontes.
- Botão de destaque (CTA): no máximo um por tela, com bg-cta e text-cta-foreground.
- Logo: use só os arquivos de https://cdn.jsdelivr.net/npm/@novah-care/constela@{{versao}}/dist/brand/logo/. Versão sem sufixo em fundo claro; "-negativo" em fundo escuro ou teal. Vale também para estados alternativos, como o header ao rolar.
- Sobre fundo teal escuro: títulos e selos em text-teal-200, destaque em text-amber-400, texto de apoio no mínimo text-teal-50/75. Card claro dentro de seção escura leva text-foreground.
- Raios: rounded-lg em botões e inputs, rounded-xl em cards.
- Não crie novas variáveis de cor nem altere o tema.
```

### 5. Sites de leitura

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
