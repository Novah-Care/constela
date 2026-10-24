---
title: Logo
section: Marca
order: 1
description: Formatos, cores e regras de uso do logotipo Novah Care.
---
# Logo

O logotipo Novah Care tem três formatos (principal, compacta e símbolo) e quatro cores. A largura disponível escolhe o formato; o fundo escolhe a cor.

<!-- constela:logos -->

Os arquivos estão no pacote em `dist/brand/logo/` e no CDN:

```text
https://cdn.jsdelivr.net/npm/@novah-care/constela@{{versao}}/dist/brand/logo/novah-care-principal.svg
```

## Formato pela largura

| Formato | Largura | Uso típico |
| --- | --- | --- |
| Principal | A partir de 200px | Site, capas, apresentações, telas de login |
| Compacta | De 96 a 199px | Header de aplicativo, sidebar, assinatura de e-mail, cabeçalho de documento |
| Símbolo | Abaixo de 96px | Favicon, ícone de app, avatar em redes |

A versão compacta é o mesmo desenho com "care" maior, para continuar legível em tamanho pequeno. Abaixo de 48px, use o `novah-care-simbolo-pequeno.svg`, com traço reforçado.

## Cor pelo fundo

- **Fundos claros** (branco, `neutral-50`, `teal-50`): versão sem sufixo. Novah em `teal-900`, care e fios em `teal-700`.
- **Fundos escuros** (`teal-900`, tema escuro, foto escura): versão `-negativo`.
- **Uma cor** (impressão, carimbo, marca d'água): `-preto` ou `-branco`.

## Área de proteção

Deixe livre, em todos os lados, 25% da altura do logo. Os arquivos não têm margem interna: o espaço vem do layout.

## Tamanho mínimo

Digital: principal 200px, compacta 96px, símbolo 16px. Impresso: principal 40mm, compacta 20mm, símbolo 6mm.

## Favicon

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

Os três arquivos estão em `dist/brand/favicon/`.

## Não faça

- Distorcer, girar ou recolorir fora das quatro cores.
- Aplicar sombra, contorno ou brilho.
- Usar a versão de fundo claro em fundo escuro.
- Criar outro "N" para o ícone.

## Uso da marca

O logotipo e o símbolo são marcas da Novah Care, com todos os direitos reservados. A licença MIT do Constela não se aplica a eles. Veja o arquivo `LICENSE-BRAND`.
