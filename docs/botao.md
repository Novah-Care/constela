---
title: Botão
section: Componentes
order: 1
description: Seis variantes e três tamanhos de botão.
---
# Botão

Botão de ação com seis variantes e três tamanhos.

```html exemplo
<button class="nc-btn nc-btn--primary">Salvar alterações</button>
<button class="nc-btn nc-btn--secondary">Exportar planilha</button>
<button class="nc-btn nc-btn--accent">Solicitar diagnóstico</button>
<button class="nc-btn nc-btn--ghost">Ver histórico</button>
<button class="nc-btn nc-btn--danger">Cancelar exame</button>
<button class="nc-btn nc-btn--outline">Voltar</button>
```

```html exemplo
<button class="nc-btn nc-btn--primary nc-btn--sm">Pequeno</button>
<button class="nc-btn nc-btn--primary">Médio</button>
<button class="nc-btn nc-btn--primary nc-btn--lg">Grande</button>
<button class="nc-btn nc-btn--primary" disabled>Desabilitado</button>
```

## Quando usar

| Variante | Uso |
| --- | --- |
| Primary | A ação principal da tela. Uma por área. |
| Secondary | Ações de apoio ao lado da principal. |
| Accent | CTA comercial ou de conversão. No máximo um por tela, nunca ao lado de um Primary. |
| Ghost | Ações terciárias, paginação, "Ver mais". |
| Danger | Ações destrutivas, sempre com confirmação. |
| Outline | Ações neutras, como "Voltar" e "Cancelar". |

## Especificação

- Alturas: 32px (`--sm`), 40px (padrão), 48px (`--lg`). No mobile, mínimo de 44px.
- Plus Jakarta Sans 600; 12, 14 e 16px conforme o tamanho.
- Raio de 8px em todos os tamanhos.
- Ícone Lucide de 20px à esquerda, com 8px de distância do texto.
- Foco: anel `focus-ring` de 2px com offset de 2px. Desabilitado: 50% de opacidade.

## Tailwind

```html
<button class="inline-flex h-10 items-center gap-2 rounded-lg px-4 font-heading text-sm font-semibold bg-action-primary text-on-action-primary hover:bg-action-primary-hover">Salvar alterações</button>
<button class="inline-flex h-10 items-center gap-2 rounded-lg px-4 font-heading text-sm font-semibold bg-action-accent text-on-action-accent hover:bg-action-accent-hover">Solicitar diagnóstico</button>
```

## Não faça

- Texto branco sobre `amber-500` ou `teal-600`.
- Botão em caixa alta.
- Dois Accent na mesma tela.
