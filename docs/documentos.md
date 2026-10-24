---
title: Documentos
section: Início rápido
order: 4
description: Como aplicar o Constela em documentos DOCX e PDF gerados por código.
---
# Documentos

Programas, laudos, contratos, políticas e relatórios seguem a mesma marca dos produtos. Em geradores de documento (docx-js, ReportLab, Puppeteer), leia os valores dos tokens em vez de copiar hexadecimais:

```js
import { color } from '@novah-care/constela';

const TEAL_900 = color('teal-900').slice(1); // '064e4e', formato sem # usado pelo docx-js
const TEAL_800 = color('teal-800').slice(1);
const AMBER = color('amber-500').slice(1);
const TEXTO = color('neutral-800').slice(1);
const TEXTO_APOIO = color('neutral-500').slice(1);
```

## Regras

| Elemento | Valor |
| --- | --- |
| Capa | Fundo `teal-900`, logo `novah-care-principal-negativo.png`, divisor `amber-500` |
| Título de seção (H1) | `teal-900`, negrito |
| Subtítulo (H2 e H3) | `teal-800`, negrito |
| Texto | `neutral-800` |
| Cabeçalho e rodapé | `neutral-500`, com o logo `novah-care-compacta.png` no cabeçalho |
| Header de tabela | Fundo `teal-50` ou `teal-900` (com texto branco) |

- Não use `teal-500` ou `neutral-400` como cor de texto: ficam abaixo de 3:1 sobre branco.
- Em PDF gerado por navegador (Puppeteer, Playwright), importe `index.css` e as fontes da marca vêm junto.
- Em DOCX, Arial é aceito como fonte enquanto o documento não embutir Plus Jakarta Sans e DM Sans, porque o leitor pode não ter as fontes instaladas.
- Logos em PNG estão em `dist/brand/logo/`, com fundo transparente e sem margem interna.
