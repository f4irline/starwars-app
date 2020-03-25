declare namespace Cypress {
    interface Chainable {
        saveLocalStorageCache(): Chainable<Element>;
        restoreLocalStorageCache(): Chainable<Element>;
        clearLocalStorageCache(): Chainable<Element>;
    }
}
