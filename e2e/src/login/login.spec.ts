import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login Page', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
    });

    it('should render login page', () => {
        expect(page.getTitleText()).toEqual('Enter your username and password');
    });

    it('should not login user', () => {
        page.enterUsername('Wrong username');
        page.enterPassword('12345');
        page.login();
        const errorText = page.getErrorText();
        expect(errorText.getText()).toEqual('Wrong username or password.');
    });

    it('should login user', () => {
        page.enterUsername('Tommi');
        page.enterPassword('12345');
        page.login();
        expect(page.getTitle()).toEqual('Home');
    });

    it('should remember user login credentials', () => {
        page.navigateTo();
        browser.wait(browser.ExpectedConditions.urlContains('home'), 5000);
        expect(browser.getTitle()).toEqual('Home');
    });

    afterAll(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
