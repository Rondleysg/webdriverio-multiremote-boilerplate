# Fixtures

No contexto deste projeto WebdriverIO, **fixtures** são funções reutilizáveis exportadas de `fixtures/index.ts` que encapsulam fluxos comuns (ex.: login no app).

## O que existe hoje

**Arquivo:** `fixtures/index.ts`

- **loginFixture(browser)**: recebe uma instância de browser (WebdriverIO). Preenche email/senha nos campos do app, clica no botão de login e espera a tela home (`~home-screen`) estar exibida. Útil para testes que precisam começar já logados.

Uso nos specs: importar a função e chamá-la passando a sessão do app (ex.: o retorno de `getDeviceFromCapabilities('mobile')` ou o browser, conforme o caso).

## Por que usar fixtures

- **Reuso**: um único lugar para o fluxo de login (ou outro fluxo repetido), evitando duplicar passos em vários testes.
- **Manutenção**: alterações nos seletores ou nos passos são feitas em um só arquivo.

## Como adicionar uma nova fixture

1. Abra `fixtures/index.ts`.
2. Crie uma função async que receba pelo menos a instância do browser/app (tipo `Browser` de `webdriverio`).
3. Exporte a função (ou adicione ao export existente).

### Exemplo: fixture de login no app

```ts
// fixtures/index.ts
import type { Browser } from 'webdriverio'

export async function loginFixture(browser: Browser) {
    const emailInput = await browser.$('~email-input')
    const passwordInput = await browser.$('~password-input')
    const loginButton = await browser.$('~login-button')
    await emailInput.setValue('teste@exemplo.com')
    await passwordInput.setValue('123456')
    await loginButton.click()
    await browser.$('~home-screen').waitForDisplayed()
}
```

Uso no spec:

```ts
import { expect } from '@wdio/globals'
import { getDeviceFromCapabilities } from '../lib/Utils'
import { loginFixture } from '../fixtures'

describe('Meu fluxo', () => {
    it('deve estar na home após login', async () => {
        const mobile = getDeviceFromCapabilities('mobile')
        await loginFixture(mobile)
        // ... asserções na home
    })
})
```

## Regra para os specs

- Para asserções, importar `expect` de `@wdio/globals`.
- Para acessar browser ou app no multiremote, usar `getDeviceFromCapabilities('browser')` ou `getDeviceFromCapabilities('mobile')` de `lib/Utils`.
- Para fluxos prontos (ex.: login), importar e chamar as funções de `fixtures/`.
