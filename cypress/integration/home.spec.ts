describe('Home', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login('Tommi', '12345');
    });

    it('should render home page', () => {
        cy.title().should('eq', 'Home');
        cy.get('[data-cy=home-header]').should(
            'contain.text',
            'Star Wars Characters'
        );
    });
});
