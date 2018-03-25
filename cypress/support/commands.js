const responseStub = result =>
  Promise.resolve({
    json () {
      return Promise.resolve(result)
    },
    text () {
      return Promise.resolve(JSON.stringify(result))
    },
    ok: true,
  })

Cypress.Commands.add('mockGraphQL', handler => {
  cy.on('window:before:load', win => {
    const originalFunction = win.fetch

    function fetch (path, { body, method }) {
      if (path.includes('http://localhost:4000') && method === 'POST') {
        return responseStub(handler(JSON.parse(body)))
      }

      return originalFunction.apply(this, arguments)
    }

    cy.stub(win, 'fetch', fetch).as('graphqlStub')
  })
})
