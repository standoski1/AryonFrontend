import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with default props', () => {
    cy.mount(<Button>Click me</Button>)
    cy.get('button').should('be.visible')
    cy.get('button').should('contain.text', 'Click me')
  })

  it('renders with variant prop', () => {
    cy.mount(<Button variant="destructive">Delete</Button>)
    cy.get('button').should('be.visible')
    cy.get('button').should('contain.text', 'Delete')
  })

  it('handles click events', () => {
    const onClickSpy = cy.spy().as('onClickSpy')
    cy.mount(<Button onClick={onClickSpy}>Click me</Button>)
    cy.get('button').click()
    cy.get('@onClickSpy').should('have.been.calledOnce')
  })
}) 