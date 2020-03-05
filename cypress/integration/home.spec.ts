context('Home', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('should work', () => {
        cy.login();
        expect(true).to.equal(true);
    });
});
