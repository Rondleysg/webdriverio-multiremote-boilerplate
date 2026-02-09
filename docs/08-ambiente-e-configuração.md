# Ambiente e configuração

Como variar URLs, dispositivos e outras opções por ambiente (local, CI, staging) sem mudar o código dos testes.

## Variáveis de ambiente

### Principais (exemplo em .env.example)

| Variável                  | Uso                          | Exemplo                    |
|---------------------------|------------------------------|----------------------------|
| `ANDROID_DEVICE_NAME`     | Nome do dispositivo/emulador Android | `Android_Test`       |
| `ANDROID_PLATFORM_VERSION`| Versão do Android            | `14`                       |
| `IOS_DEVICE_NAME`         | Nome do dispositivo/simulador iOS    | `iPhone 12`          |
| `IOS_PLATFORM_VERSION`    | Versão do iOS                | `14.5`                    |
| `FRONTEND_URL`            | URL do frontend (browser)    | `https://app.staging.com`  |
| `BACKEND_URL`             | URL do backend (API)          | `https://api.staging.com`  |
| `PARTNERS_URL`            | URL de parceiros (se usado)  |                            |

O `baseUrl` do browser está definido em `configs/wdio.shared.conf.ts` (ex.: `http://the-internet.herokuapp.com`). Para usar URLs por ambiente, pode-se ler `process.env.FRONTEND_URL` (ou funções em `lib/env.ts`) e definir no config ou nos Page Objects.

### Uso local

1. Copie `.env.example` para `.env`.
2. Preencha as variáveis que quiser (ex.: `FRONTEND_URL=https://app.staging.com`).
3. **Não commite** o arquivo `.env`.

O shared config já usa `import 'dotenv/config'`, então as variáveis do `.env` são carregadas ao rodar o wdio.

Para definir variáveis no terminal antes de rodar:
- PowerShell: `$env:FRONTEND_URL="https://..."`
- Bash: `export FRONTEND_URL="https://..."`

### Uso em CI

No pipeline (GitHub Actions, Azure DevOps, etc.), defina as variáveis no job:

```yaml
env:
  ANDROID_DEVICE_NAME: Android_Test
  ANDROID_PLATFORM_VERSION: "14"
  FRONTEND_URL: ${{ secrets.FRONTEND_URL_STAGING }}
```

Assim os testes rodam contra o ambiente desejado sem alterar o repositório.

## Configurações WebdriverIO

- **configs/wdio.shared.conf.ts**: config base; define specs, baseURL, framework (Mocha), timeouts, hooks (ex.: `before` com `updateSettings` para Android).
- **configs/wdio.android.conf.ts**: capabilities multiremote (browser Chrome + mobile Android); path do APK em `apps/`.
- **configs/wdio.ios.conf.ts**: capabilities multiremote para iOS + browser; path do app iOS.
- **configs/wdio.sauce.conf.ts**: execução na nuvem (Sauce Labs), se utilizado.

Para um fluxo em outro domínio:
- Use URL absoluta no spec ou no Page Object, ou
- Defina `baseUrl` por variável de ambiente e leia em `lib/env.ts`, atribuindo no config.

## .gitignore

Devem estar ignorados:

- `node_modules/`
- `.env`
- `.env.local`
- Relatórios e artefatos do WebdriverIO (ex.: `./report/`, `./logs/`)

Mantenha `.env` fora do controle de versão; use `.env.example` como modelo.
