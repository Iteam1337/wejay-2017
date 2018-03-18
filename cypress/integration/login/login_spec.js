describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('login form is disabled with invalid e-mail', () => {
    cy.get('[data-cy="email"]').type('cookie.com')

    cy.contains('Save user').should('be.disabled')
  })

  it('login form is disabled with valid e-mail', () => {
    cy.get('[data-cy="email"]').type('cookie@monster.com')

    cy.contains('Save user').should('not.be.disabled')
  })

  it('should add the user and redirect to rooms list and set user id', () => {
    cy.get('[data-cy="email"]').type('cookie@monster.com')
    cy.contains('Save user').click()

    cy.contains('Rooms list')

    cy
      .window()
      .its('localStorage')
      .invoke('getItem', 'id')
      .should('eq', 'd34479239e70df24688f16b94add383f')
  })
})
