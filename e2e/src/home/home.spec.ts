import { HomePage } from './home.po';
import { browser } from 'protractor';

describe('Home Page', () => {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display home page', () => {
        page.login();
        browser.wait(browser.ExpectedConditions.urlContains('home'), 2000);
        expect(page.getHeaderTitle()).toEqual('Star Wars Characters');
    });

    afterAll(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
