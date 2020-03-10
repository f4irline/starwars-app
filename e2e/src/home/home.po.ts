import { browser, by, element } from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get(`${browser.baseUrl}/home`) as Promise<any>;
    }

    getTitle() {
        return browser.getTitle() as Promise<string>;
    }

    getHeader() {
        return element(
            by.css('app-root .home .header h1')
        ).getText() as Promise<string>;
    }
}
