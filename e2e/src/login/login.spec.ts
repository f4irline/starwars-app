import { LoginPage } from './login.po';
import { browser, element, by } from 'protractor';

describe('Login Page', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
    });

    it('should display login page', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Enter your username and password');
    });

    it('should login user', () => {
        page.navigateTo();
        page.enterUsername('Tommi');
        page.enterPassword('12345');
        page.login();
        expect(page.getTitle()).toEqual('Home');
    });

    it('should not login user', () => {
        page.navigateTo();
        page.enterUsername('Wrong username');
        page.enterPassword('12345');
        page.login();
        expect(element(by.css('.login-error'))).toBeDefined();
    });

    afterEach(async () => {
        browser.executeScript('window.localStorage.clear();');
    });
});
