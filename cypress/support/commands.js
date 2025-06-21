// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('buscarAgendamento', (id) => {   
  cy.request({
      method: 'GET',
      url: `https://restful-booker.herokuapp.com/booking/${id}`,
      failOnStatusCode: false
    }) 
  })

Cypress.Commands.add('cadastrarAgendamento', (payload) => {   
  cy.request({
      method: 'POST',
      body: payload,
      url: `https://restful-booker.herokuapp.com/booking/`,
      failOnStatusCode: false
    }) 
  }) 
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })