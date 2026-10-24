---
title: Visão geral
section: Introdução
order: 1
description: Constela é o design system da Novah Care: tokens, CSS, temas e marca para todos os produtos.
---
# Constela

Constela é o design system da Novah Care. Ele reúne num só pacote as cores, a tipografia, os espaçamentos, os componentes e a marca usados nos portais, nos sites e nos documentos da empresa.

Um único arquivo de tokens gera tudo o que os projetos consomem: variáveis CSS, configuração do Tailwind CSS, adaptador para shadcn/ui, tema do Material UI, fontes e logotipos. Quando um valor muda, ele muda em todos os produtos na próxima versão do pacote.

## O que vem no pacote

| Arquivo | Para quê |
| --- | --- |
| `index.css` | Tudo para HTML puro: fontes, tokens e componentes |
| `tokens.css` | Variáveis CSS de cor, espaço, raio, sombra e movimento, com tema claro e escuro |
| `tailwind.css` | Configuração para Tailwind CSS v4: escalas da marca e classes de papel (`bg-surface`, `text-fg-muted`) |
| `shadcn.css` | Liga as variáveis do shadcn/ui aos tokens do Constela. Serve para projetos gerados no Lovable |
| `components.css` | Classes `nc-*` de botão, campo, card, badge de status, tabela e sidebar |
| `editorial.css` | Padrão de leitura para artigos longos |
| `@novah-care/constela/mui` | Tema do Material UI pronto, claro e escuro |
| `@novah-care/constela` | Tokens em JavaScript, para gráficos e estilos dinâmicos |
| `fonts/` e `brand/` | Fontes da marca e o kit de logotipos e favicons |

## Princípios

- **Clareza.** Saúde ocupacional tem muitas siglas e prazos. Cada tela responde uma pergunta e mostra o próximo passo.
- **Confiança.** Dados de saúde pedem uma interface sóbria: teal como base, âmbar só onde há ação.
- **Eficiência.** Quem usa resolve a tarefa com o mínimo de passos.
- **Consistência.** O mesmo componente, com o mesmo nome e o mesmo token, em todos os produtos. Se um valor não está no Constela, ele não entra no produto.
- **Acessibilidade.** WCAG 2.1 AA como piso, conferido por teste automático a cada versão.

## Por onde começar

1. Escolha o guia de início rápido da sua stack: [Next.js com Tailwind](nextjs-tailwind.html), [Next.js com Material UI](nextjs-mui.html), [HTML e Lovable](html-e-lovable.html) ou [documentos](documentos.html).
2. Leia [Cor](cor.html) e [Tipografia](tipografia.html): a maior parte das dúvidas está nos papéis de cor.
3. Use os [componentes](botao.html) prontos em vez de recriar estilos.

## Licença

O código do Constela (CSS, JavaScript, scripts e tokens) é distribuído sob a licença MIT. O nome Novah Care, o logotipo e o símbolo são marcas da Novah Care, com todos os direitos reservados: podem ser usados apenas em produtos e materiais da própria Novah Care. As fontes seguem a SIL Open Font License, incluída na pasta `fonts/`.
