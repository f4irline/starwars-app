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

    login(username: string, password: string) {
        element(by.id('username')).click();
        browser
            .actions()
            .sendKeys(username)
            .perform();

        element(by.id('password')).click();
        browser
            .actions()
            .sendKeys(password)
            .perform();

        return element(by.id('submit')).click();
    }

    getTitle() {
        return browser.getTitle() as Promise<string>;
    }

    getErrorText() {
        return element(by.css('app-root .container .login .action p'));
    }
}
