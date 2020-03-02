import { LoginPage } from './login.po';
import { browser, element, by } from 'protractor';
import { HomePage } from '../home/home.po';

describe('Login Page', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
    });

    it('should display login page', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Enter your username and password');
    });

    it('should not login user', () => {
        page.navigateTo();
        page.login('Wrong username', '12345');
        expect(element(by.css('.login-error'))).toBeDefined();
    });

    it('should login user', () => {
        page.navigateTo();
        page.login('Tommi', '12345');
        expect(browser.getTitle()).toEqual('Home');
    });

    it('should remember user login credentials', () => {
        page.navigateTo();
        browser.wait(browser.ExpectedConditions.urlContains('home'), 2000);
        expect(browser.getTitle()).toEqual('Home');
    });

    afterAll(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
