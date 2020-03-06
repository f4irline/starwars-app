context('Home', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('should work', () => {
        const header = cy.get('h1');
        header.should('contain.text', 'Star Wars Application');
    });

    it('should login', () => {
        cy.login();
        const header = cy.get('.home .header h1');
        header.should('contain.text', 'Star Wars Characters');
    });

    after(() => {
        cy.clearLocalStorage();
    });
});