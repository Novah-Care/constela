# Changelog

Todas as mudanças relevantes do Constela. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/).

## Não lançado

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
