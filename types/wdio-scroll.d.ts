/**
 * Augments ScrollIntoViewOptions with WebdriverIO mobile-native-app options.
 * @see https://webdriver.io/docs/api/element/scrollIntoView/
 */
declare global {
    interface ScrollIntoViewOptions {
        /** MOBILE-NATIVE-APP-ONLY: element to scroll within */
        scrollableElement?: WebdriverIO.Element
        /** MOBILE-NATIVE-APP-ONLY: direction of scroll (default: up) */
        direction?: 'up' | 'down' | 'left' | 'right'
        /** MOBILE-NATIVE-APP-ONLY: max scrolls until stop (default: 10) */
        maxScrolls?: number
        /** MOBILE-NATIVE-APP-ONLY: swipe duration in ms (default: 1500) */
        duration?: number
        /** MOBILE-NATIVE-APP-ONLY: percentage of scrollable to swipe (0–1, default: 0.95) */
        percent?: number
    }
}

export {}
