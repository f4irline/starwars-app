import { browser, by, element } from 'protractor';
import { LoginPage } from '../login/login.po';

export class HomePage {
    navigateTo() {
        return browser.get(`${browser.baseUrl}/home`) as Promise<any>;
    }

    login() {
        new LoginPage().login('Tommi', '12345');
        browser.refresh();
    }

    getHeaderTitle(): Promise<string> {
        return element(by.css('app-root .home .header h3')).getText() as Promise<string>;
    }
}
