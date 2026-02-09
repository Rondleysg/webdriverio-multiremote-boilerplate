# Como adicionar um novo fluxo

Um **fluxo** é um conjunto de testes para um mesmo contexto (ex.: login, onboarding, checkout). Cada fluxo pode ter specs em `test/` e, se houver dados, em `test-data/`.

## Checklist

1. **Criar pasta/arquivos de spec** em `test/specs/<fluxo>/` ou `test/e2e/` (conforme o tipo de teste).
2. **Criar pasta de dados** (se houver inputs): `test-data/<fluxo>/` ou `test-data/api/<fluxo>/`, `test-data/ui/<fluxo>/`.
3. **Definir inputs/constantes**: `inputs.json` (ou `inputs.ts`), ou `Constants.ts`; se precisar variar muito, adicionar `builder.ts` usando `lib/data-factory`.
4. **Escrever os specs**: importar `expect` de `@wdio/globals`; usar Page Objects / Screen Objects e `lib/Utils`; para dados, importar de test-data ou usar builder.
5. **Configuração**: se o fluxo usar outra baseURL ou outro app, configurar em `configs/` ou via variáveis de ambiente (ver [08 - Ambiente e configuração](08-ambiente-e-configuração.md)).

## Passo a passo

### 1. Criar specs do fluxo

```text
test/specs/meufluxo/
    login.spec.ts
    checkout.spec.ts
```

Ou em `test/e2e/` se for um fluxo que mistura browser e app no mesmo arquivo.

Certifique-se de que o padrão `specs` em `configs/wdio.shared.conf.ts` inclui esses arquivos (ex.: `../test/specs/**/*.ts`).

### 2. Criar pasta de dados (opcional)

```text
test-data/meufluxo/
    inputs.json
    builder.ts   # opcional
```

### 3. Exemplo de inputs

**test-data/meufluxo/inputs.json**

```json
{
  "login": { "username": "user@test.com", "password": "senha123" },
  "checkout": { "productId": "123" }
}
```

### 4. Exemplo de spec (browser)

**test/specs/meufluxo/login.spec.ts**

```ts
import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/LoginPage'
import SecurePage from '../../pageobjects/SecurePage'

describe('Meu fluxo - Login', () => {
    it('deve fazer login com sucesso', async () => {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
    })
})
```

### 5. Exemplo de spec (app)

**test/specs/meufluxo/login-app.spec.ts**

```ts
import { expect } from '@wdio/globals'
import TabBar from '../../screenobjects/components/TabBar'
import LoginScreen from '../../screenobjects/LoginScreen'

describe('Meu fluxo - Login no app', () => {
    it('deve exibir home após login', async () => {
        await TabBar.openLogin()
        await LoginScreen.submitLoginForm({ username: 'user@test.com', password: 'senha123' })
        // ... asserções na home
    })
})
```

### 6. BaseURL ou app diferente

- **Browser:** altere `baseUrl` no `configs/wdio.shared.conf.ts` ou use variáveis de ambiente (ex.: `FRONTEND_URL`) e leia em `lib/env.ts`.
- **App:** altere o path do app em `configs/wdio.android.conf.ts` ou `wdio.ios.conf.ts` (ex.: `apps/meuapp.apk`).

## Nomenclatura

- **Pasta do fluxo:** nome curto e claro (ex.: `login`, `checkout`, `onboarding`).
- **Arquivos de spec:** `.ts`; o nome pode descrever o cenário (ex.: `login.spec.ts`, `checkout.spec.ts`).

## Rodar os testes

```bash
npm run test-android
npm run test-ios
# ou
wdio run ./configs/wdio.android.conf.ts
wdio run ./configs/wdio.ios.conf.ts
```

Para rodar apenas um arquivo, use o parâmetro de spec do WebdriverIO (consulte [09 - Comandos e opções](09-comandos-e-opcoes.md)).
