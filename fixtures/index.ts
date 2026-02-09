import { BUNDLE_ID, PACKAGE_NAME } from "test-data/e2e/Constants"

export async function loginFixture(browser: WebdriverIO.Browser) {
    const emailInput = await browser.$('~email-input')
    const passwordInput = await browser.$('~password-input')
    const loginButton = await browser.$('~login-button')

    await emailInput.setValue('teste@exemplo.com')
    await passwordInput.setValue('123456')
    await loginButton.click()

    await browser.$('~home-screen').waitForDisplayed()
}

export async function reLaunchApp(emulator: WebdriverIO.Browser) {
    const identifier = emulator.isAndroid ? PACKAGE_NAME : BUNDLE_ID

    const appIdentifier = {
        [emulator.isAndroid ? 'appId' : 'bundleId']: identifier,
    }
    const terminateCommand = 'mobile: terminateApp'
    const launchCommand = `mobile: ${
        emulator.isAndroid ? 'activateApp' : 'launchApp'
    }`

    await emulator.execute(terminateCommand, appIdentifier)
    await emulator.execute(launchCommand, appIdentifier)
}