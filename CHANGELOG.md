# Changelog

Todas as mudanças relevantes do Constela. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/).

## Não lançado

## 1.2.0

### Adicionado

- Badge de status `inactive` (`inactive`, `inactive-soft` e `inactive-text`), em cinza, para Inativo, Desligado e Arquivado. Antes esses estados caíam no `info`, em azul.
- Cor `vermelho` na tag de categoria (`tag-vermelho-soft` e `tag-vermelho-text`), para o tipo que pede atenção de prazo, como o exame demissional. Onde o vermelho já indica estado, como na vigência de laudos, a regra continua sendo escolher outra cor.

## 1.1.0

### Adicionado

- Tag de categoria (`nc-tag`), para o tipo de uma entidade (tipo de exame, tipo de laudo) com uma cor por valor, separada das cores de status: sem ponto, com canto `radius-sm` e oito cores sem vermelho (`tag-{cor}-soft` e `tag-{cor}-text`, com azul, verde, violeta, rosa, laranja, ciano, oliva e anil). Os pares entram no teste de contraste e no Tailwind (`bg-tag-azul-soft`, `text-tag-azul-text`).

### Corrigido

- Logotipo, símbolo e favicons revetorizados com curvas suaves: os SVGs anteriores vinham de vetorização automática, com curvas facetadas no "Novah" e degraus nas letras de "care", visíveis a partir de uns 200px de largura. O desenho e a composição de cada versão não mudam, e os arquivos ficaram com metade do tamanho. PNGs e `favicon.ico` gerados de novo a partir dos SVGs.

## 1.0.1

### Documentação

- Guia do Lovable revisado a partir da aplicação no site institucional: levantar variáveis próprias e estados do logo antes de instalar, apontar as variáveis para os tokens em vez de removê-las, garantir `--primary` e `--ring` mesmo quando o import fica antes das variáveis do projeto, e checklist de revisão de contraste sobre fundo escuro.
- Regras do Knowledge do Lovable com cores para texto sobre fundo teal escuro.
- Logo do README com endereço absoluto, para aparecer também na página do npm.

## 1.0.0

Primeira versão pública.

### Adicionado

- Tokens de cor (escalas teal, amber, neutros e status; papéis com tema claro e escuro), tipografia, espaçamento, raios, sombras, layout e movimento, a partir do Novah Care Design System v1.0.
- Arquivos gerados: `tokens.css`, `tokens-auto.css`, `tokens-core.css`, `tailwind.css` (Tailwind v4), `shadcn.css`, `components.css`, `editorial.css`, `fonts.css`, `index.css`.
- Tema do Material UI (`@novah-care/constela/mui`) e tokens em JavaScript.
- Padrão de leitura com Source Serif 4 para sites editoriais.
- Fontes Plus Jakarta Sans, DM Sans e Source Serif 4 (subset latino).
- Kit de marca revisado: logotipo principal, compacta e símbolo, em quatro cores, e favicons.
- Teste automático de contraste WCAG 2.1 AA nos dois temas.
- Site de documentação.

### Ajustado em relação ao v1.0

- Ação primária e links em `teal-800` (antes `teal-600`, 2,99:1 com branco).
- CTA em `amber-500` com texto escuro (antes texto branco, 2,15:1).
- Botão de perigo em `#dc2626` (antes `#ef4444`, 3,76:1 com branco).
- Anel de foco em `teal-700` no tema claro (antes `teal-400`, 2,57:1 sobre branco).
- Texto selecionado no tema escuro em branco (antes `teal-100`, 4,45:1).
