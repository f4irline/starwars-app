import { LoginPage } from './login.po';
import { browser, element, by } from 'protractor';
import { HomePage } from '../home/home.po';

describe('Login Page', () => {
    let page: LoginPage;
    let homePage: HomePage;

    beforeEach(() => {
        page = new LoginPage();
        homePage = new HomePage();
    });

    it('should display login page', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Enter your username and password');
    });

    it('should not login user', () => {
        page.navigateTo();
        page.enterUsername('Wrong username');
        page.enterPassword('12345');
        page.login();
        expect(element(by.css('.login-error'))).toBeDefined();
    });

    it('should login user', () => {
        page.navigateTo();
        page.enterUsername('Tommi');
        page.enterPassword('12345');
        page.login();
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
