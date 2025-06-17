import { API_URL } from '@/lib/config'

describe('Recommendations Page', () => {
  beforeEach(() => {
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

    // Mock recommendations data
    cy.intercept('GET', `${API_URL}/api/recommendations*`, (req) => {
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
        req.reply({
          statusCode: 200,
          body: {
            data: [
              {
                tenantId: "tenant-001",
                recommendationId: "rec-001",
                title: "Sample Recommendation",
                slug: "sample-recommendation",
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
    }).as('getRecommendations')

    // Visit the page
    cy.visit('/recommendations', { failOnStatusCode: false })
    cy.debugPage() // Debug the current state
  })

  it('loads and displays recommendations', () => {
    // Wait for the page to load
    cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    cy.get('[data-testid="recommendation-card"]').should('have.length.at.least', 1)
  })

  // it('handles search functionality', () => {
  //   // Wait for the page to load
  //   cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
  //   cy.get('[data-testid="search-input"]').type('nonexistent')
  //   cy.wait('@getRecommendations')
  //   cy.get('[data-testid="recommendation-card"]').should('not.exist')
  // })

  // it('filters recommendations by tag', () => {
  //   // Wait for the page to load
  //   cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
  //   cy.get('[data-testid="filter-button"]').click()
  //   cy.get('[data-testid="filter-option"]').first().click()
  //   cy.wait('@getRecommendations')
  //   cy.get('[data-testid="recommendation-card"]').should('not.exist')
  // })

  // it('archives a recommendation', () => {
  //   // Wait for the page to load
  //   cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
  //   cy.intercept('POST', `${API_URL}/api/recommendations/*/archive`, {
  //     statusCode: 200,
  //     body: { success: true }
  //   }).as('archiveRequest')

  //   cy.get('[data-testid="archive-button"]').first().click()
  //   cy.wait('@archiveRequest')
  //   cy.get('[data-testid="toast"]').should('be.visible')
  // })

  // it('navigates to archive page', () => {
  //   // Wait for the page to load
  //   cy.get('[data-testid="recommendation-card"]', { timeout: 10000 }).should('exist')
    
  //   cy.get('[data-testid="archive-link"]').click()
  //   cy.url().should('include', '/recommendations/archive')
  // })

  // it('handles infinite scroll', () => {
  //   // Mock second page of results
  //   cy.intercept('GET', `${API_URL}/api/recommendations*`, {
  //     statusCode: 200,
  //     body: {
  //       data: [
  //         {
  //           recommendationId: '2',
  //           title: 'Second Recommendation',
  //           description: 'Second description',
  //           score: 80,
  //           provider: ['aws'],
  //           frameworks: [{ name: 'CIS', version: '1.0' }],
  //           reasons: ['Security best practice'],
  //           class: 'high',
  //           impactAssessment: {
  //             violations: 100,
  //             timeframe: 'month',
  //             mostImpactedScope: 'Backend',
  //             scopeType: 'Subscription',
  //           },
  //           resourcesEnforced: ['Linux virtual machines'],
  //           isArchived: false,
  //           createdAt: '2023-01-02',
  //           updatedAt: '2023-01-02',
  //         }
  //       ],
  //       pagination: {
  //         cursor: { next: null },
  //         totalItems: 2
  //       },
  //       availableTags: {
  //         frameworks: ['CIS'],
  //         reasons: ['Security'],
  //         providers: ['AWS'],
  //         classes: ['High']
  //       }
  //     }
  //   }).as('getMoreRecommendations')

  //   cy.wait('@getRecommendations')
  //   cy.scrollTo('bottom')
  //   cy.wait('@getMoreRecommendations')
  //   cy.get('[data-testid="recommendation-card"]').should('have.length', 2)
  // })

  // it('toggles theme', () => {
  //   cy.get('[data-testid="theme-toggle"]').click()
  //   cy.get('html').should('have.class', 'dark')
  //   cy.get('[data-testid="theme-toggle"]').click()
  //   cy.get('html').should('not.have.class', 'dark')
  // })
}) 