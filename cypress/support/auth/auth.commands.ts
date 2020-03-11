// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
Cypress.Commands.add(
    'login',
    (username: string, password: string): Cypress.Chainable => {
        return cy
            .get('[data-cy=username]')
            .type(username)
            .get('[data-cy=password]')
            .type(password)
            .get('[data-cy=login]')
            .click();
    }
);
