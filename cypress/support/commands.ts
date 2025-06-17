/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      logout(): Chainable<void>
      debugPage(): Chainable<void>
    }
  }
}


Cypress.Commands.add('debugPage', () => {
  cy.log('Current URL:', cy.url())
  cy.document().then((doc) => {
    cy.log('Document ready state:', doc.readyState)
    cy.log('Document title:', doc.title)
    cy.log('Document body:', doc.body.innerHTML)
  })
})

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: {
      id: '1',
      username,
      token: 'test-token'
    }
  }).as('login')

  cy.visit('/login', { failOnStatusCode: false })
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.wait('@login')
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click()
  cy.url().should('include', '/login')
})

export {} 