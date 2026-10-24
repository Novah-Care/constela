---
title: Acessibilidade
section: Fundamentos
order: 5
description: Contraste, foco e regras de acessibilidade.
---
# Acessibilidade

WCAG 2.1 AA é o piso de todos os produtos. Os pares de cor do Constela são conferidos por teste automático a cada versão (`npm test`), nos dois temas.

## Contraste

- Texto: 4,5:1. Texto grande (24px ou mais, ou 19px em negrito): 3:1.
- Bordas de controle, ícones que carregam significado e anel de foco: 3:1.

<!-- constela:contraste -->

## Foco

Todo elemento interativo mostra foco: `outline: 2px solid var(--focus-ring)` com `outline-offset: 2px`. Nunca remova o outline sem colocar outro indicador no lugar. Sobre fundo teal escuro, use anel branco.

## Regras

- Cor nunca é o único indicador. Status sempre tem texto; erro sempre tem ícone e mensagem.
- Todo campo tem label visível. Use `aria-label` só quando não houver label visual possível.
- Mensagens de erro são anunciadas com `aria-live="polite"`.
- Alvos de toque têm no mínimo 44 por 44px no mobile (`touch-target`).
- Ícone sozinho precisa de `aria-label`.
- Teste com teclado (Tab, Enter, Esc) antes de publicar.
