# Test data (inputs e constantes)

Os dados de entrada e constantes dos testes ficam em `test-data/`, organizados por fluxo. Isso permite **alterar inputs** em um só lugar e **gerar dados variados** com `lib/data-factory` e builders opcionais.

## Estrutura atual

```
test-data/
└── e2e/
    └── Constants.ts    # Constantes do fluxo E2E (ex.: BUNDLE_ID, PACKAGE_NAME)
```

- **Constants.ts**: identificadores do app (bundle ID para iOS, package name para Android), usados por `lib/Utils` (ex.: `reLaunchApp`) e por configs quando necessário.
- Para novos fluxos, pode-se criar `test-data/<fluxo>/` com `inputs.json`, `inputs.ts` ou `builder.ts`.

## Estrutura sugerida para novos fluxos

```
test-data/
├── e2e/
│   └── Constants.ts
├── api/
│   └── <fluxo>/
│       └── inputs.json   # ou inputs.ts
└── ui/
    └── <fluxo>/
        ├── inputs.json   # ou inputs.ts
        └── builder.ts    # opcional
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

- **Só constantes ou inputs estáticos**: use `test-data/e2e/Constants.ts` ou `inputs.json` e importe no spec ou em `lib/Utils`.
- **Precisa variar alguns campos**: crie `builder.ts` usando `randomEmail()`, `randomString()`, etc. de `lib/data-factory` e use o builder no spec.
