---
title: Contribuindo
section: Projeto
order: 1
description: Como propor mudanças no Constela.
---
# Contribuindo

## Como o pacote é gerado

Tudo sai de `tokens/tokens.json`. O build (`npm run build`) gera os arquivos de `dist/`; o site de documentação (`npm run site`) é gerado a partir de `docs/`.

```bash
npm install
npm run check   # build, testes e site
```

Abra `site/index.html` no navegador para conferir a documentação.

## Propondo uma mudança

1. Abra uma issue explicando o problema: onde o valor atual não serve e por quê.
2. Mude o `tokens/tokens.json` (ou o CSS em `src/`) e a documentação em `docs/`.
3. Rode `npm run check`. O teste de contraste falha se algum par prometido ficar abaixo do AA.
4. Registre a mudança em `CHANGELOG.md`, na seção "Não lançado".
5. Abra o pull request.

## Regras

- Todo valor novo vem com uma nota de uso no token.
- Componentes não declaram cor solta: só `var(--token)`. O teste confere.
- Nada interno da Novah Care no repositório: nomes de sistemas, endereços de ambientes, dados de clientes ou de colaboradores.
- Mudança no logotipo ou nas fontes passa por aprovação da Novah Care.
