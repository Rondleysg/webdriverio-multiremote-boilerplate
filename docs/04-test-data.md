# Test data (inputs e constantes)

Os dados de entrada e constantes dos testes ficam em `test-data/`, organizados por fluxo. Isso permite **alterar inputs** em um só lugar e **gerar dados variados** com `lib/data-factory` e builders opcionais.

## Estrutura atual

```
test-data/
├── Constants.ts       # Constantes globais (BUNDLE_ID, PACKAGE_NAME)
└── login/
    ├── inputs.json    # Dados de login (browser e app)
    └── messages.json  # Mensagens de asserção (ex.: loginSuccessMessage)
```

- **Constants.ts**: identificadores do app (bundle ID para iOS, package name para Android), usados pelo config e por `fixtures/reLaunchApp`.
- Por fluxo: `test-data/<fluxo>/` com `inputs.json`, `messages.json` (opcional) ou `builder.ts`. Exemplo: `test-data/login/` e specs em `test/login/`.

## Estrutura sugerida para novos fluxos

```
test-data/
├── Constants.ts         # já existe; use para constantes globais do app
├── <fluxo>/
│   ├── inputs.json      # ou inputs.ts
│   ├── messages.json    # opcional (mensagens de UI/asserção)
│   └── builder.ts       # opcional (geração de dados)
```

- **inputs.json / inputs.ts**: entradas estáticas (um objeto ou vários cenários).
- **builder.ts** (opcional): função que monta um objeto padrão e aceita overrides; pode usar `lib/data-factory` para gerar valores.

## Inserir novos inputs (estáticos)

1. Crie ou edite a pasta do fluxo: `test-data/<fluxo>/` (ou `test-data/api/<fluxo>/`, `test-data/ui/<fluxo>/`).
2. Adicione ou altere `inputs.json` (ou `inputs.ts`) e importe nos specs quando fizer sentido.

## Gerar dados diferentes (builder + data-factory)

Quando precisar **variar** dados (ex.: email único por execução), use um **builder** que chama `lib/data-factory`:

```ts
// test-data/ui/meufluxo/builder.ts
import { randomEmail } from '../../lib/data-factory'

export interface FormInput {
  nome: string
  email: string
  // ...
}

export function createFormInput(overrides?: Partial<FormInput>): FormInput {
  return {
    nome: 'Maria Silva',
    email: randomEmail(),
    ...overrides,
  }
}
```

## Quando usar o quê

- **Só constantes ou inputs estáticos**: use `test-data/Constants.ts` ou `test-data/<fluxo>/inputs.json` e importe no spec.
- **Precisa variar alguns campos**: crie `builder.ts` usando `randomEmail()`, `randomString()`, etc. de `lib/data-factory` e use o builder no spec.
