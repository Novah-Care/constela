---
title: Badge de status
section: Componentes
order: 4
description: Pílula com ponto e texto para o estado de uma entidade.
---
# Badge de status

Pílula que mostra o estado de uma entidade (exame, ASO, colaborador, evento do eSocial) com ponto de cor e texto.

```html exemplo
<span class="nc-badge nc-badge--success">Concluído</span>
<span class="nc-badge nc-badge--warning">Pendente</span>
<span class="nc-badge nc-badge--error">Cancelado</span>
<span class="nc-badge nc-badge--info">Em análise</span>
<span class="nc-badge nc-badge--scheduled">Agendado</span>
<span class="nc-badge nc-badge--inactive">Desligado</span>
```

| Tipo | Fundo | Texto | Ponto | Exemplos |
| --- | --- | --- | --- | --- |
| `success` | `success-soft` | `success-text` | `success` | Ativo, Concluído, Apto |
| `warning` | `warning-soft` | `warning-text` | `warning` | Pendente, Em andamento, A vencer |
| `error` | `error-soft` | `error-text` | `error` | Erro, Cancelado, Vencido, Inapto |
| `info` | `info-soft` | `info-text` | `info` | Em análise |
| `scheduled` | `scheduled-soft` | `scheduled-text` | `scheduled` | Agendado |
| `inactive` | `inactive-soft` | `inactive-text` | `inactive` | Inativo, Desligado, Arquivado |

## Especificação

Pílula com padding de 2px por 10px, DM Sans 500, 12px, ponto de 6px à esquerda. Os fundos são claros nos dois temas, então o texto do badge não muda no escuro.

## Regras

- O texto do estado é obrigatório: a cor nunca é o único indicador.
- Use o mesmo vocabulário de estados para a mesma entidade em todos os produtos.
- Não use as cores de status como decoração nem como cor de texto solta.
