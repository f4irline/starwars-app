describe('Home Page', () => {
    before(() => {
        cy.visit('http://localhost:4200');
    });

    it('check the title', () => {
        cy.get('h1')
            .invoke('text')
            .should('equal', 'Star Wars Application');
    });

    it('should log in', () => {
        cy.get('#userName').type('Tommi');
        cy.get('#password').type('12345');
        cy.get('#submit').click();
    });
});
