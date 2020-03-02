import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(
            by.css('app-root .container .login .header')
        ).getText() as Promise<string>;
    }

    login() {
        return element(by.id('submit')).click();
    }

    getErrorText() {
        return element(by.css('.login-error'));
    }

    enterUsername(username: string) {
        element(by.id('username')).click();
        browser
            .actions()
            .sendKeys(username)
            .perform();
    }

    enterPassword(password: string) {
        element(by.id('password')).click();
        browser
            .actions()
            .sendKeys(password)
            .perform();
    }
}
