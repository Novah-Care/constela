---
title: Card
section: Componentes
order: 3
description: Superfície para agrupar informação, incluindo KPI.
---
# Card

Superfície que agrupa informação relacionada.

```html exemplo
<div class="nc-card"><div class="nc-kpi__value">1.284</div><span class="nc-kpi__label">Colaboradores ativos</span></div>
<div class="nc-card"><div class="nc-kpi__value">37</div><span class="nc-kpi__label">ASOs a vencer em 30 dias</span></div>
<div class="nc-card"><div class="nc-kpi__value">98,6%</div><span class="nc-kpi__label">Eventos do eSocial enviados no mês</span></div>
```

```html exemplo
<div class="nc-card"><h3 class="nc-card__title">Dados pessoais</h3><p class="nc-card__body">Nome, CPF, data de nascimento e contato.</p></div>
<div class="nc-card nc-card--clickable" tabindex="0"><h3 class="nc-card__title">Unidade Centro</h3><p class="nc-card__body">214 colaboradores · 6 GHEs</p></div>
<div class="nc-card nc-card--urgent"><h3 class="nc-card__title">Exames atrasados</h3><p class="nc-card__body">12 periódicos passaram do prazo.</p></div>
```

## Variantes

| Classe | Uso |
| --- | --- |
| `nc-card` | Fundo `bg-surface`, borda `border-default`, raio de 12px, padding de 24px, `shadow-sm`. |
| `nc-card--clickable` | Card que leva a outra tela. Hover com `shadow-md` e borda `border-focus`. |
| `nc-card--highlight` | Item em foco numa lista: borda esquerda de 4px em `teal-600`. |
| `nc-card--urgent` | Atenção imediata: borda superior de 4px em `amber-500`. |
| `nc-kpi__value` e `nc-kpi__label` | Número em Plus Jakarta Sans 700, 30px; rótulo em 12px, `text-secondary`. |

## Regras

- Números no formato brasileiro: 1.284; 98,6%.
- Um assunto por card. Não coloque card dentro de card.
- KPIs ficam no topo do painel, antes dos widgets.
