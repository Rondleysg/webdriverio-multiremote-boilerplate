# Comandos e opções

Comandos para rodar os testes WebdriverIO (Android, iOS, headless) e opções de execução.

## Comandos (npm scripts)

Execute na raiz do projeto:

| Comando | Descrição |
|---------|-----------|
| `npm run test-android` | Roda testes no Android (emulador/dispositivo) + browser (Chrome) conforme `wdio.android.conf.ts` |
| `npm run test-ios` | Roda testes no iOS (simulador/dispositivo) + browser conforme `wdio.ios.conf.ts` |
| `npm run test-android-headless` | Roda testes Android com browser em modo headless |
| `npm run test-ios-headless` | Roda testes iOS com browser em modo headless |
| `npm run build` | Verifica TypeScript (`tsc --noEmit`) |

### Rodar com o CLI do WebdriverIO

```bash
# Android
wdio run ./configs/wdio.android.conf.ts

# iOS
wdio run ./configs/wdio.ios.conf.ts

# Android headless (browser sem janela)
wdio run ./configs/wdio.android.conf.ts --headless
```

### Rodar um arquivo ou suite específica

O WebdriverIO permite filtrar specs por path ou por nome de suite/teste. Consulte a documentação oficial para as opções exatas (ex.: `--spec`, `--mochaOpts.grep`).

Exemplo (sintaxe pode variar conforme versão):

```bash
wdio run ./configs/wdio.android.conf.ts --spec test/e2e/test.e2e.ts
```

---

## Opções de execução

### `--headless` (browser sem janela)

Os scripts `test-android-headless` e `test-ios-headless` passam `--headless` para a execução; o browser Chrome roda em modo headless (sem abrir janela). Útil em CI ou quando não for necessário ver a interface do browser.

### Configuração de specs

O caminho dos arquivos de teste é definido em `configs/wdio.shared.conf.ts` na propriedade `specs` (ex.: `../test/specs/**/*.ts`). Ajuste esse padrão para incluir novos diretórios (ex.: `../test/e2e/**/*.ts`).

---

## Resumo rápido

| Objetivo | Comando |
|----------|---------|
| Rodar testes no Android | `npm run test-android` ou `wdio run ./configs/wdio.android.conf.ts` |
| Rodar testes no iOS | `npm run test-ios` ou `wdio run ./configs/wdio.ios.conf.ts` |
| Rodar Android com browser headless | `npm run test-android-headless` |
| Verificar tipos TypeScript | `npm run build` |
