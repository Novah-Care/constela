---
title: Tabela
section: Componentes
order: 5
description: Tabela de listagem com header da marca.
---
# Tabela

Tabela de listagem para colaboradores, exames, prestadores e eventos.

```html exemplo
<div style="border:1px solid var(--border-default);border-radius:var(--radius-lg);overflow:hidden">
<table class="nc-table">
  <thead><tr><th>Colaborador</th><th>Exame</th><th>Data</th><th>Status</th><th class="nc-num">Dias</th></tr></thead>
  <tbody>
    <tr><td>Ana Souza</td><td>Periódico</td><td>28/10/2026</td><td><span class="nc-badge nc-badge--scheduled">Agendado</span></td><td class="nc-num">4</td></tr>
    <tr><td>Bruno Lima</td><td>Admissional</td><td>21/10/2026</td><td><span class="nc-badge nc-badge--success">Concluído</span></td><td class="nc-num">0</td></tr>
    <tr><td>Carla Mendes</td><td>Retorno ao trabalho</td><td>15/10/2026</td><td><span class="nc-badge nc-badge--warning">Pendente</span></td><td class="nc-num">9</td></tr>
  </tbody>
</table>
</div>
```

## Especificação

- Header: fundo `table-header-bg`, texto `table-header-text`, Plus Jakarta Sans 600, 12px, caixa alta, espaçamento de 0.05em.
- Linhas com altura mínima de 48px, DM Sans 14px, alternância `table-row-alt` e hover `table-row-hover`.
- Só bordas horizontais, em `border-default`.
- Números alinhados à direita com algarismos tabulares (`nc-num`).

## Página de lista

1. Título, contador e botão Primary à direita.
2. Barra de filtros com chips do filtro ativo e "Limpar filtros".
3. Tabela em largura total, com ordenação nos headers e seleção em lote quando houver ação em massa.
4. Paginação à direita, com botões Ghost.
5. Estado vazio com ilustração, texto e CTA.

Datas em dd/mm/aaaa. Status sempre com o badge de status.
