---
title: Versões
section: Projeto
order: 2
description: Versionamento e atualização do pacote.
---
# Versões

O Constela segue o versionamento semântico:

- **Patch** (1.0.x): correção de valor sem mudança visível de intenção, documentação.
- **Minor** (1.x.0): token, componente ou arquivo novo, sem quebrar o que existe.
- **Major** (x.0.0): token renomeado ou removido, mudança de papel que altera telas existentes.

## Atualizando nos projetos

Fixe a versão no `package.json` e deixe o Dependabot (ou o Renovate) abrir o pull request de atualização. Leia o changelog antes de aceitar uma versão major.

Em sites que usam o CDN, troque a versão na URL.

## Publicação

Cada tag `v*` no repositório publica o pacote no npm, com proveniência. Este site é atualizado a cada mudança na `main`. O histórico completo está no [CHANGELOG](https://github.com/Novah-Care/constela/blob/main/CHANGELOG.md).
