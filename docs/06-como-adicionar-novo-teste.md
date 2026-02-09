# Como adicionar um novo teste

Sempre que criar um novo teste, siga o padrão: usar Mocha (`describe`/`it`), importar `expect` de `@wdio/globals`, usar `lib/Utils` para acessar browser/mobile e, quando fizer sentido, dados de `test-data` ou fixtures.

## Teste no browser (web)

1. **Onde:** em `test/specs/` ou `test/e2e/` (ex.: `test/specs/login/login.spec.ts`), ou ajuste o padrão de specs no `configs/wdio.shared.conf.ts`.
2. **Import:** `expect` de `@wdio/globals`; Page Objects ou `getDeviceFromCapabilities('browser')` de `lib/Utils`.
3. **Dados:** importe de `test-data` quando houver (ex.: inputs.json); senão defina no próprio spec.
4. **Acesso ao browser:** use `getDeviceFromCapabilities('browser')` ou a Page Object que já o utiliza (ex.: `LoginPage`, `SecurePage`).

### Exemplo mínimo (browser)

```ts
// test/specs/login/login.spec.ts
import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/LoginPage'
import SecurePage from '../../pageobjects/SecurePage'

describe('Login no browser', () => {
    it('deve fazer login e exibir mensagem de sucesso', async () => {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining('You logged into a secure area!'))
    })
})
```

---

## Teste no app (mobile)

1. **Onde:** em `test/specs/` ou `test/e2e/` (ex.: `test/specs/app/login-app.spec.ts`).
2. **Import:** `expect` de `@wdio/globals`; Screen Objects ou `getDeviceFromCapabilities('mobile')` e helpers de `lib/Utils`.
3. **Acesso ao app:** use `getDeviceFromCapabilities('mobile')` ou as Screen Objects (ex.: `TabBar`, `LoginScreen`, `NativeAlert`).

### Exemplo mínimo (app)

```ts
// test/specs/app/login-app.spec.ts
import { expect } from '@wdio/globals'
import TabBar from '../../screenobjects/components/TabBar'
import LoginScreen from '../../screenobjects/LoginScreen'
import NativeAlert from '../../screenobjects/components/NativeAlert'

describe('Login no app', () => {
    it('deve exibir alerta de sucesso após login', async () => {
        await TabBar.waitForTabBarShown()
        await TabBar.openLogin()
        await LoginScreen.waitForIsShown(true)
        await LoginScreen.tapOnLoginContainerButton()
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test1234!' })
        await NativeAlert.waitForIsShown()
        await expect(await NativeAlert.text()).toContain('Success')
    })
})
```

---

## Teste E2E (browser + app no mesmo teste)

1. **Onde:** em `test/e2e/` (ex.: `test/e2e/test.e2e.ts`).
2. **Import:** `expect` de `@wdio/globals`; `getDeviceFromCapabilities`, `reLaunchApp` de `lib/Utils`; Page Objects e Screen Objects conforme necessário.
3. **Fluxo:** pode rodar passos no browser e no app em sequência ou em paralelo (`Promise.all`).

### Exemplo (browser e app)

```ts
// test/e2e/test.e2e.ts
import { expect } from '@wdio/globals'
import { getDeviceFromCapabilities, reLaunchApp } from '../lib/Utils'
import LoginPage from '../pageobjects/LoginPage'
import SecurePage from '../pageobjects/SecurePage'
import TabBar from '../screenobjects/components/TabBar'
import LoginScreen from '../screenobjects/LoginScreen'
// ...

describe('E2E browser e app', () => {
    it('login no browser e no app em paralelo', async () => {
        const emulator = getDeviceFromCapabilities('mobile')
        const browser = getDeviceFromCapabilities('browser')
        await Promise.all([
            browser.reloadSession(),
            reLaunchApp(emulator),
        ])
        // ... login no browser e no app
    })
})
```

---

## Checklist rápido

- [ ] Arquivo em `test/specs/` ou `test/e2e/` com extensão `.ts` (e padrão de specs alinhado ao `wdio.shared.conf.ts`).
- [ ] Import de `expect` de `@wdio/globals`.
- [ ] Uso de `getDeviceFromCapabilities('browser')` ou `getDeviceFromCapabilities('mobile')` quando precisar da sessão diretamente; caso contrário, use Page Objects / Screen Objects.
- [ ] Dados em `test-data` quando houver inputs reutilizáveis; builder quando precisar variar.
- [ ] Nome do teste descritivo (cenário + resultado esperado).
- [ ] Arrange-Act-Assert quando ajudar na leitura.
