// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
Cypress.Commands.add(
    'login',
    (): Cypress.Chainable => {
        return cy.get('#login').type('Test');
    }
);
