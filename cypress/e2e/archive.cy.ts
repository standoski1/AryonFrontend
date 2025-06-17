import { API_URL } from '@/lib/config'

describe('Archive Page', () => {
  beforeEach(() => {
    // UI login step
    cy.visit('/login')
    cy.get('#username').type('admin')
    cy.get('#password').type('password')
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/login')

    // Mock successful login
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

    // Mock archived recommendations data
    cy.intercept('GET', `${API_URL}/api/recommendations/archived*`, (req) => {
      const search = req.query.search as string
      const tags = req.query.tags as string

      if (search || tags) {
        req.reply({
          statusCode: 200,
          body: {
            data: [],
            pagination: {
              cursor: { next: null },
              totalItems: 0
            },
            availableTags: {
              frameworks: [],
              reasons: [],
              providers: [],
              classes: []
            }
          }
        })
      } else {
        // Return sample data for initial load
        req.reply({
          statusCode: 200,
          body: {
            data: [
              {
                tenantId: "tenant-001",
                recommendationId: "rec-001",
                title: "Sample Archived Recommendation",
                slug: "sample-archived-recommendation",
                description: "Sample description",
                score: 80,
                provider: [2],
                frameworks: [
                  {
                    name: "Sample Framework",
                    section: "A1",
                    subsection: "A1.1"
                  }
                ],
                reasons: ["Sample reason"],
                furtherReading: [
                  {
                    name: "Sample Guide",
                    href: "https://example.com"
                  }
                ],
                totalHistoricalViolations: 100,
                affectedResources: [
                  {
                    name: "sample-resource"
                  }
                ],
                impactAssessment: {
                  totalViolations: 50,
                  mostImpactedScope: {
                    name: "sample-scope",
                    type: "Sample Type",
                    count: 25
                  }
                },
                class: 3
              }
            ],
            pagination: {
              cursor: { next: "rec-001" },
              totalItems: 50
            },
            availableTags: {
              frameworks: ["Sample Framework"],
              reasons: ["Sample reason"],
              providers: ["UNSPECIFIED", "AWS", "AZURE"],
              classes: ["UNSPECIFIED_RECOMMENDATION", "COMPUTE_RECOMMENDATION"]
            }
          }
        })
      }
    }).as('getArchivedRecommendations')

    cy.visit('/recommendations/archive', { failOnStatusCode: false })
    cy.debugPage() 
  })

  it('loads and displays archived recommendations', () => {
    cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    cy.get('[data-testid="recommendation-card"]').should('have.length.at.least', 1)
  })

//   it('unarchives a recommendation', () => {
//     // Wait for the page to load
//     cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
//     // Mock the unarchive API request
//     cy.intercept('POST', '**/recommendations/*/unarchive', {
//       statusCode: 200,
//       body: { success: true }
//     }).as('unarchiveRequest')

//     cy.get('[data-testid="unarchive-button"]').first().click()
//     cy.wait('@unarchiveRequest')
//     cy.get('[data-testid="toast"]').should('be.visible')
//   })

  it('navigates back to recommendations', () => {
    cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
    cy.get('[data-testid="back-link"]').click()
    cy.url().should('include', '/recommendations')
  })

//   it('handles search in archive', () => {
//     // Wait for the page to load
//     cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
//     cy.get('[data-testid="search-input"]').type('nonexistent')
//     cy.wait('@getArchivedRecommendations')
//     cy.get('[data-testid="recommendation-card"]').should('not.exist')
//   })

//   it('filters archived recommendations', () => {
//     // Wait for the page to load
//     cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
//     cy.get('[data-testid="filter-button"]').click()
//     cy.get('[data-testid="filter-option"]').first().click()
//     cy.wait('@getArchivedRecommendations')
//     cy.get('[data-testid="recommendation-card"]').should('not.exist')
//   })
}) 