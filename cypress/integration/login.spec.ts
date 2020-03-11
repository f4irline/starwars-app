describe('Login', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('should render login page', () => {
        const titleText = cy.get('app-root .container .login .header');
        titleText.should('contain.text', 'Enter your username and password');
    });

    it('should login', () => {
        cy.login('Tommi', '12345');
        const title = cy.title();
        title.should('eq', 'Home');
    });
});
