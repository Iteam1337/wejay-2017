describe('Login page', () => {
  beforeEach(() => {
    cy.mockGraphQL(({ operationName, variables }) => {
      if (operationName === 'StartQuery') {
        return {
          data: {
            rooms: [],
          },
        }
      }

      if (operationName === 'AddRoom') {
        return {
          data: {
            addRoom: {
              name: variables.roomName,
              __typename: 'Room',
            },
          },
        }
      }
    })

    cy.visit('/')
  })

  it('login form is disabled with invalid e-mail', () => {
    cy.get('[data-test="email"]').type('cookie.com')

    cy.contains('Save user').should('be.disabled')
  })

  it('login form is disabled with valid e-mail', () => {
    cy.get('[data-test="email"]').type('cookie@monster.com')

    cy.contains('Save user').should('not.be.disabled')
  })

  it('should add the user and redirect to rooms list and set user id', () => {
    cy.get('[data-test="email"]').type('cookie@monster.com')
    cy.contains('Save user').click()

    cy.contains('Rooms list')

    cy
      .window()
      .its('localStorage')
      .invoke('getItem', 'id')
      .should('eq', 'd34479239e70df24688f16b94add383f')
  })

  it.only('should add a room', () => {
    cy.get('[data-test="email"]').type('cookie@monster.com')
    cy.contains('Save user').click()

    // Add a room
    cy
      .get('[data-test="btn-add-room"]')
      .as('addRoom')
      .should('be.disabled')
      .get('[data-test="btn-room-iteam"]')
      .should('not.exist')
      .get('[data-test="input-room-name"]')
      .as('roomName')
      .type('iteam')
      .get('@addRoom')
      .should('not.be.disabled')
      .click()
      .get('[data-test="btn-room-iteam"]')
      .should('exist')
      .get('@roomName')
      .should('have.value', '')

    // Can add another room
    cy
      .get('@roomName')
      .type('test')
      .get('@addRoom')
      .click()
      .get('[data-test="btn-room-iteam"]')
      .should('exist')
      .get('[data-test="btn-room-test"]')
      .should('exist')

    // Can't add a room with an existing name
    cy
      .get('[data-test="error-room-name"]')
      .should('not.exist')
      .get('@roomName')
      .type('iteam')
      .get('@addRoom')
      .click()
      .get('[data-test="btn-room-iteam"]')
      .should('have.length', 1)
      .get('[data-test="error-room-name"]')
      .should('exist')
      .and('contain', 'Room already exists')
  })
})
