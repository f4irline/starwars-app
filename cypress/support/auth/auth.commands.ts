// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
Cypress.Commands.add(
    'login',
    (): Cypress.Chainable => {
        return cy
            .get('[data-cy=username]')
            .type('Tommi')
            .get('[data-cy=password]')
            .type('12345')
            .get('[data-cy=login]')
            .click();
    }
);
