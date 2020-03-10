import { HomePage } from './home.po';
import { browser } from 'protractor';
import { LoginPage } from '../login/login.po';

describe('Home Page', () => {
    let homePage: HomePage;

    beforeAll(() => {
        const loginPage = new LoginPage();
        loginPage.navigateTo();
        loginPage.enterUsername('Tommi');
        loginPage.enterPassword('12345');
        loginPage.login();
    });

    beforeEach(() => {
        homePage = new HomePage();
    });

    it('should render home page', () => {
        expect(homePage.getTitle()).toEqual('Home');
        expect(homePage.getHeader()).toEqual(
            'Star Wars Characters'.toUpperCase()
        );
    });

    it('should open characters list', () => {
        const bmiClassList = homePage.getBmiClassList();
        browser
            .actions()
            .mouseMove(bmiClassList)
            .click()
            .perform();
        expect(homePage.getCharactersModal().isDisplayed()).toBeTruthy();
    });

    afterAll(() => {
        browser.executeScript('window.localStorage.clear();');
    });
});
