import { LoginPage } from './login.po';
import { browser, element, by } from 'protractor';
import { HomePage } from '../home/home.po';

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
        expect(element(by.css('.login-error')).isPresent()).toBeTruthy();
    });

    it('should login user', () => {
        page.enterUsername('Tommi');
        page.enterPassword('12345');
        page.login();
        expect(page.getTitle()).toEqual('Home');
    });

    it('should remember user login credentials', () => {
        page.navigateTo();
        browser.wait(browser.ExpectedConditions.urlContains('home'), 2000);
        expect(browser.getTitle()).toEqual('Home');
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
