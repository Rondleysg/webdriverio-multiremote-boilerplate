# Estrutura de diretórios

Cada diretório tem um papel definido. O projeto usa WebdriverIO com Appium para E2E em browser e app nativo.

## Árvore

```
projeto/
├── docs/                 # Documentação (esta pasta)
├── configs/              # Configurações WebdriverIO
│   ├── wdio.shared.conf.ts   # Config base (specs, mocha, baseURL, hooks)
│   ├── wdio.android.conf.ts   # Android + browser (multiremote)
│   ├── wdio.ios.conf.ts       # iOS + browser (multiremote)
│   └── wdio.sauce.conf.ts     # Sauce Labs (opcional)
├── test/                 # Specs (arquivos de teste)
│   ├── specs/            # Specs gerais (*.ts; path configurável no shared)
│   └── e2e/              # Testes E2E (ex.: browser + app no mesmo teste)
├── pageobjects/          # Page Objects para páginas web (browser)
├── screenobjects/        # Screen Objects para telas do app nativo (mobile)
│   └── components/       # Componentes reutilizáveis (ex.: TabBar, NativeAlert)
├── fixtures/             # Fixtures/funções reutilizáveis (ex.: loginFixture)
├── lib/                  # Utilitários compartilhados (env, data-factory, Utils)
├── test-data/            # Dados e constantes por fluxo
│   └── e2e/              # Constantes E2E (ex.: BUNDLE_ID, PACKAGE_NAME)
├── apps/                 # Binários do app (APK, IPA ou placeholder)
├── .env.example          # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## Diretórios

### `configs/`

- **Papel**: configurações do WebdriverIO (runner, specs, capabilities, Mocha, hooks).
- **Arquivos**:
  - `wdio.shared.conf.ts`: config base; define specs (`test/specs/**/*.ts`), baseURL (the-internet.herokuapp.com), framework Mocha, hooks (ex.: `before` para `updateSettings` no Android).
  - `wdio.android.conf.ts`: multiremote com capabilities `browser` (Chrome) e `mobile` (Appium Android); usa `wdio.shared.conf`.
  - `wdio.ios.conf.ts`: multiremote para iOS + browser.
  - `wdio.sauce.conf.ts`: execução na nuvem (Sauce Labs), se usado.

### `test/`

- **Papel**: arquivos de teste (specs).
- **Estrutura**:
  - `test/specs/**/*.ts`: specs incluídos pelo config shared (padrão).
  - `test/e2e/*.ts`: testes E2E que usam browser e app no mesmo fluxo (ex.: login no browser e no app).
- **Convenção**: use `describe`/`it` (Mocha); importe `expect` de `@wdio/globals`; use `getDeviceFromCapabilities('browser')` ou `getDeviceFromCapabilities('mobile')` (de `lib/Utils`) para acessar a sessão correta.

### `pageobjects/`

- **Papel**: Page Object Model para páginas web (browser).
- **Exemplos**: `Page.ts` (base), `LoginPage.ts`, `SecurePage.ts`. Acessam o browser via `getDeviceFromCapabilities('browser')` e usam seletores WebdriverIO (`$`, `$$`).

### `screenobjects/`

- **Papel**: Screen Object Model para telas do app nativo (mobile).
- **Estrutura**: telas (ex.: `LoginScreen.ts`, `HomeScreen.ts`) e `components/` (ex.: `TabBar.ts`, `NativeAlert.ts`). Usam seletores nativos (accessibility id, resource-id, etc.) via `lib/Utils` (ex.: `getElementByTestIDApp`).

### `fixtures/`

- **Papel**: funções reutilizáveis entre testes. Ex.: `loginFixture(browser)` que preenche login e espera a home no app.
- **Arquivo principal**: `index.ts` — exporta `loginFixture` e outras funções que recebem uma instância de browser/app.

### `lib/`

- **Papel**: código compartilhado entre testes e config.
- **Arquivos**:
  - `env.ts`: leitura de `BASE_URL`, `FRONTEND_URL`, `BACKEND_URL`, etc.; usado quando o config ou os testes precisam de URLs.
  - `data-factory.ts`: `randomString()`, `randomEmail()`, `randomNumber()` para gerar dados.
  - `Utils.ts`: `getDeviceFromCapabilities(key)` (acesso a browser/mobile no multiremote), helpers de seletores para app (`getElementByTestIDApp`, `getElementByAccessibilityLabelApp`, etc.), `reLaunchApp(emulator)`.

### `test-data/`

- **Papel**: dados de entrada e constantes por fluxo.
- **Estrutura**: ex.: `test-data/e2e/Constants.ts` com `BUNDLE_ID`, `PACKAGE_NAME` usados por `lib/Utils` e pelo app.

### `apps/`

- **Papel**: binários do app (APK para Android, IPA para iOS) ou placeholder. Os configs Android/iOS referenciam o caminho do app (ex.: `apps/android.wdio.native.app.v1.0.8.apk`).

### Raiz do projeto

- **configs/wdio.*.conf.ts**: configuração do WebdriverIO; o shared é importado pelos demais.
- **.env.example**: lista de variáveis (ANDROID_DEVICE_NAME, IOS_DEVICE_NAME, FRONTEND_URL, etc.); copiar para `.env` e não commitar.
- **package.json**: scripts `test-android`, `test-ios`, `test-android-headless`, `test-ios-headless`, `build`.

## Localizar o fluxo

- **Onde estão os specs?** → `test/specs/` ou `test/e2e/`.
- **Onde estão os dados/constantes?** → `test-data/e2e/` (e futuros fluxos em `test-data/<fluxo>/`).
- **Rodar Android**: `npm run test-android` ou `wdio run ./configs/wdio.android.conf.ts`.
- **Rodar iOS**: `npm run test-ios` ou `wdio run ./configs/wdio.ios.conf.ts`.
