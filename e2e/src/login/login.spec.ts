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

    it('should not login user', async () => {
        await page.enterUsername('Wrong username');
        await page.enterPassword('12345');
        await page.login();
        const errorText = await page.getErrorText();
        expect(errorText.getText()).toEqual('Wrong username or password.');
    });

    it('should login user', async () => {
        await page.enterUsername('Tommi');
        await page.enterPassword('12345');
        await page.login();
        expect(page.getTitle()).toEqual('Home');
    });

    it('should remember user login credentials', async () => {
        await page.navigateTo();
        await browser.wait(
            browser.ExpectedConditions.urlContains('home'),
            5000
        );
        expect(browser.getTitle()).toEqual('Home');
    });

    afterAll(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
