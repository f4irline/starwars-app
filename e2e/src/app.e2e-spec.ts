import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display login page', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Enter your username and password');
    });

    it('should login user', () => {
        page.navigateTo();
        page.focusUsernameField();
        page.enterUsername('Tommi');
        page.focusPasswordField();
        page.enterPassword('12345');
        page.login();
        expect(page.getTitle()).toEqual('Home');
    });

    it('should not login user', () => {
        page.navigateTo();
        page.focusUsernameField();
        page.enterUsername('Wrong username');
        page.focusPasswordField();
        page.enterPassword('12345');
        page.login();
        expect(element(by.css('.login-error'))).toBeDefined();
    });

    afterEach(async () => {
        browser.executeScript('window.localStorage.clear();');
    });
});
