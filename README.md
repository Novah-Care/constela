<p>
  <img src="brand/logo/novah-care-compacta.svg" alt="Novah Care" width="160">
</p>

# Constela

Constela é o design system da [Novah Care](https://novah.care). Um único arquivo de tokens gera as variáveis CSS, a configuração do Tailwind CSS v4, o adaptador para shadcn/ui, o tema do Material UI, as fontes e o kit de marca usados nos produtos da empresa.

**Documentação:** https://constela.novah.care/

## Instalação

```bash
npm install @novah-care/constela
```

### Tailwind CSS v4

```css
@import 'tailwindcss';
@import '@novah-care/constela/tailwind.css';
```

### shadcn/ui e Lovable

```css
/* depois das variáveis do shadcn/ui */
@import '@novah-care/constela/shadcn.css';
```

### Material UI

```ts
import { createNovahTheme } from '@novah-care/constela/mui';
import '@novah-care/constela/fonts.css';

const theme = createNovahTheme('light'); // ou 'dark'
```

### HTML puro

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@novah-care/constela@1.0.0/dist/index.css">
<button class="nc-btn nc-btn--primary">Agendar exame</button>
```

## O que vem no pacote

| Caminho | Conteúdo |
| --- | --- |
| `@novah-care/constela/index.css` | Fontes, tokens e componentes para HTML puro |
| `@novah-care/constela/tokens.css` | Variáveis CSS, tema claro e escuro (`.dark` ou `[data-theme="dark"]`) |
| `@novah-care/constela/tokens-auto.css` | Igual, seguindo também a preferência do sistema |
| `@novah-care/constela/tailwind.css` | `@theme` do Tailwind v4 com as escalas da marca e as classes de papel |
| `@novah-care/constela/shadcn.css` | Variáveis do shadcn/ui apontando para os tokens |
| `@novah-care/constela/components.css` | Classes `nc-*`: botão, campo, card, badge de status, tabela, sidebar |
| `@novah-care/constela/editorial.css` | Padrão de leitura para artigos longos |
| `@novah-care/constela/mui` | `createNovahTheme`, `getNovahThemeOptions`, `novahColors` |
| `@novah-care/constela` | Tokens em JavaScript: `tokens`, `color()`, `cssVar()`, `chartColors()` |
| `@novah-care/constela/tokens.json` | Fonte da verdade |
| `@novah-care/constela/fonts/*` | Plus Jakarta Sans, DM Sans e Source Serif 4 (OFL) |
| `@novah-care/constela/brand/*` | Logotipos e favicons |

## Desenvolvimento

```bash
npm install
npm run check   # gera dist/, roda os testes e gera o site em site/
```

Tudo sai de `tokens/tokens.json`. Veja [Contribuindo](https://constela.novah.care/contribuindo.html).

## Licença

- Código (CSS, JavaScript, scripts, tokens e documentação): [MIT](LICENSE).
- Nome, logotipo e símbolo Novah Care: todos os direitos reservados. Veja [LICENSE-BRAND](LICENSE-BRAND).
- Fontes: SIL Open Font License 1.1, com as licenças em [fonts/](fonts/).
