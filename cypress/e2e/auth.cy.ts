import { API_URL } from '@/lib/config'

describe('Authentication', () => {
  beforeEach(() => {
    cy.intercept('POST', `${API_URL}/api/auth/login`, {
      statusCode: 200,
      body: {
        token: 'test-token',
        user: {
          id: '1',
          username: 'testuser'
        }
      }
    }).as('loginRequest')

    cy.visit('/login', { failOnStatusCode: false })
    cy.debugPage() // Debug the current state
  })

  // it('displays login form', () => {
  //   cy.get('[data-testid="login-form"]').should('exist')
  //   cy.get('[data-testid="username-input"]').should('exist')
  //   cy.get('[data-testid="password-input"]').should('exist')
  //   cy.get('[data-testid="login-button"]').should('exist')
  // })

  // it('handles successful login', () => {
  //   cy.get('[data-testid="username-input"]').type('testuser')
  //   cy.get('[data-testid="password-input"]').type('password123')
  //   cy.get('[data-testid="login-button"]').click()

  //   cy.wait('@loginRequest')
  //   cy.url().should('include', '/recommendations')
  // })

  // it('handles login error', () => {
  //   cy.intercept('POST', `${API_URL}/api/auth/login`, {
  //     statusCode: 401,
  //     body: {
  //       error: 'Invalid credentials'
  //     }
  //   }).as('loginError')

  //   cy.get('[data-testid="username-input"]').type('wronguser')
  //   cy.get('[data-testid="password-input"]').type('wrongpass')
  //   cy.get('[data-testid="login-button"]').click()

  //   cy.wait('@loginError')
  //   cy.get('[data-testid="error-message"]').should('be.visible')
  // })

  it('redirects to login when not authenticated', () => {
    cy.visit('/recommendations', { failOnStatusCode: false })
    cy.url().should('include', '/login')
  })

  // it('handles logout', () => {
  //   // First login
  //   cy.get('[data-testid="username-input"]').type('testuser')
  //   cy.get('[data-testid="password-input"]').type('password123')
  //   cy.get('[data-testid="login-button"]').click()

  //   cy.wait('@loginRequest')
  //   cy.url().should('include', '/recommendations')

  //   // Then logout
  //   cy.get('[data-testid="logout-button"]').click()
  //   cy.url().should('include', '/login')
  // })
}) 