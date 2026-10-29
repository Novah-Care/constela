---
title: Tag de categoria
section: Componentes
order: 4.5
description: Etiqueta colorida para o tipo de uma entidade, separada das cores de status.
---
# Tag de categoria

Etiqueta que mostra o tipo de uma entidade (tipo de exame, tipo de laudo, origem) com uma cor por valor, para que a pessoa reconheça o tipo de relance numa lista ou num quadro.

```html exemplo
<span class="nc-tag nc-tag--verde">Admissional</span>
<span class="nc-tag nc-tag--azul">Periódico</span>
<span class="nc-tag nc-tag--rosa">Demissional</span>
<span class="nc-tag nc-tag--violeta">Retorno ao trabalho</span>
<span class="nc-tag nc-tag--laranja">Mudança de função</span>
<span class="nc-tag nc-tag--ciano">Ciano</span>
<span class="nc-tag nc-tag--oliva">Oliva</span>
<span class="nc-tag nc-tag--anil">Anil</span>
<span class="nc-tag">Sem cor</span>
```

| Cor | Fundo | Texto |
| --- | --- | --- |
| `azul` | `tag-azul-soft` | `tag-azul-text` |
| `verde` | `tag-verde-soft` | `tag-verde-text` |
| `violeta` | `tag-violeta-soft` | `tag-violeta-text` |
| `rosa` | `tag-rosa-soft` | `tag-rosa-text` |
| `laranja` | `tag-laranja-soft` | `tag-laranja-text` |
| `ciano` | `tag-ciano-soft` | `tag-ciano-text` |
| `oliva` | `tag-oliva-soft` | `tag-oliva-text` |
| `anil` | `tag-anil-soft` | `tag-anil-text` |

No Tailwind, as cores viram utilitários como `bg-tag-azul-soft` e `text-tag-azul-text`.

## Tag ou badge de status

- **Badge de status** responde "em que pé está": muda com o tempo (Pendente, Agendado, Concluído). Tem ponto e é uma pílula.
- **Tag de categoria** responde "o que é": não muda (Admissional, PCMSO). Não tem ponto e tem canto de `radius-sm`.

As duas podem aparecer lado a lado no mesmo card sem que o tipo seja lido como estado.

## Especificação

Padding de 2px por 8px, DM Sans 500, 12px, `radius-sm`. Os fundos são claros nos dois temas, como os do badge, então a tag não muda no escuro.

## Regras

- O texto é obrigatório: a cor ajuda a reconhecer, mas não substitui o nome.
- Não há vermelho na paleta: numa tela de prazos, vermelho é lido como vencido ou erro.
- Fixe a cor de cada valor no código e use a mesma em todos os produtos (Admissional é sempre verde).
- Com mais de oito valores, agrupe ou use a tag sem cor para os menos frequentes.
