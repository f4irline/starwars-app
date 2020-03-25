describe('Login', () => {
    before(() => {
        cy.clearLocalStorageCache();
    });

    beforeEach(() => {
        cy.restoreLocalStorageCache();
        cy.visit('');
    });

    afterEach(() => {
        cy.saveLocalStorageCache();
    });

    it('should render login page', () => {
        const titleText = cy.get('app-root .container .login .header');
        titleText.should('contain.text', 'Enter your username and password');
    });

    it('should not login user', () => {
        cy.login('Wrong username', '12345');
        cy.get('[data-cy=error-text]').should(
            'contain.text',
            'Wrong username or password.'
        );
    });

    it('should login', () => {
        cy.login('Tommi', '12345');
        const title = cy.title();
        title.should('eq', 'Home');
    });

    it('should remember user login credentials', () => {
        cy.visit('');
        cy.title().should('eq', 'Home');
    });
});
