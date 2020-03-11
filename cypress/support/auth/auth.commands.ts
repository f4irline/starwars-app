// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
Cypress.Commands.add(
    'login',
    (username: string, password: string): Cypress.Chainable => {
        return cy
            .get('#username')
            .type(username)
            .get('#password')
            .type(password)
            .get('#submit')
            .click();
    }
);
