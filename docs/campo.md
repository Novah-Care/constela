---
title: Campo de formulário
section: Componentes
order: 2
description: Label, input, ajuda e erro.
---
# Campo de formulário

Label, input, texto de ajuda e estado de erro.

```html exemplo
<div class="nc-field">
  <label class="nc-label" for="nome">Nome completo</label>
  <input class="nc-input" id="nome" placeholder="Ex.: Ana Souza">
  <span class="nc-help">Como consta no documento de identidade.</span>
</div>
<div class="nc-field nc-field--error">
  <label class="nc-label" for="cpf">CPF</label>
  <input class="nc-input" id="cpf" value="123.456.789-0" aria-invalid="true" aria-describedby="cpf-ajuda">
  <span class="nc-help" id="cpf-ajuda" aria-live="polite">CPF incompleto. Confira os 11 dígitos.</span>
</div>
<div class="nc-field">
  <label class="nc-label" for="matricula">Matrícula</label>
  <input class="nc-input" id="matricula" value="000482" disabled>
  <span class="nc-help">Definida pela folha de pagamento.</span>
</div>
```

## Especificação

- Altura de 40px (44px no mobile), padding de 8px por 12px, raio de 8px, DM Sans 14px.
- Label em DM Sans 500, 14px, a 4px do input. Ajuda em 12px, `text-secondary`.
- Foco: borda `border-focus` e halo `focus-halo` de 3px.
- Erro: borda `error`, mensagem em `text-error`, ícone e `aria-invalid="true"`.
- Desabilitado: fundo `bg-subtle`, texto `text-disabled`.
- 20px entre um campo e outro.

## Regras

- O label é obrigatório e sempre visível. Placeholder não substitui label.
- A mensagem de erro diz como corrigir: "Confira os 11 dígitos", não "Valor inválido".
