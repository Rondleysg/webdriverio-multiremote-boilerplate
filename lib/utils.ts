import { driver } from '@wdio/globals'

export function getDeviceFromCapabilities(key: string): WebdriverIO.Browser {
    const device = driver[key as keyof typeof driver] as WebdriverIO.Browser
    return device
}

export function getElementByTestIDApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$(`//*[@resource-id="${selector}"]`)
    }
    return mobile.$(`~${selector}`)
}

export function getElementsByTestIDApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$$(`//*[@resource-id="${selector}"]`)
    }
    return mobile.$$(`~${selector}`)
}

export function getElementByAccessibilityLabelApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$(`//*[@content-desc="${selector}"]`)
    }
    return mobile.$(`~${selector}`)
}

export function getElementByTextApp(selector: string, mobile: WebdriverIO.Browser) {
    const isAndroid = mobile.isAndroid
    if (isAndroid) {
        return mobile.$(`//*[@text="${selector}"]`)
    }
    return mobile.$(`-ios predicate string:label == "${selector}"`)
}