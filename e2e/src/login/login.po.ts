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

    focusUsernameField() {
        return element(by.id('username')).click();
    }

    focusPasswordField() {
        return element(by.id('password')).click();
    }

    login() {
        return element(by.id('submit')).click();
    }

    getTitle() {
        return browser.getTitle() as Promise<string>;
    }

    getErrorText() {
        return element(by.css('.login-error'));
    }

    enterUsername(username: string) {
        browser
            .actions()
            .sendKeys(username)
            .perform();
    }

    enterPassword(password: string) {
        browser
            .actions()
            .sendKeys(password)
            .perform();
    }
}
