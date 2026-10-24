---
title: Sidebar
section: Componentes
order: 6
description: Navegação principal dos portais administrativos.
---
# Sidebar

Navegação principal fixa à esquerda dos portais administrativos.

```html exemplo
<nav class="nc-sidebar" aria-label="Principal" style="min-height:300px">
  <div class="nc-sidebar__logo"><img src="assets/brand/logo/novah-care-compacta-negativo.svg" alt="Novah Care"></div>
  <div class="nc-sidebar__nav">
    <a class="nc-nav-item" href="#">Visão geral</a>
    <a class="nc-nav-item" href="#" aria-current="page">Exames</a>
    <a class="nc-nav-item" href="#">Colaboradores</a>
    <a class="nc-nav-item" href="#">Documentos</a>
  </div>
</nav>
```

## Especificação

- Largura de 256px (`sidebar-width`), fundo `bg-sidebar` (teal-900).
- Logo compacta negativa a 160px, com padding de 24px.
- Itens em Plus Jakarta Sans 500, 14px, cor `teal-100`, com ícone Lucide de 20px.
- Hover e item ativo com `bg-sidebar-active`. O ativo leva `aria-current="page"`, borda esquerda de 3px em `amber-400` e peso 600.
- Conteúdo ao lado em `bg-page`, com padding de 32px e largura máxima de 1280px.
- Abaixo de 1024px, a sidebar vira drawer.

## Regras

- Rótulos de uma ou duas palavras; no máximo oito itens no primeiro nível.
- Não use a versão do logo para fundo claro sobre a sidebar.
- O item ativo não depende só da cor: tem borda e peso diferentes.
