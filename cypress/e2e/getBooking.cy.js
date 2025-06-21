//FUNCIONANDO OK
describe('Cenarios com Get Booking', () => {
  it('Buscar UM agendamento [200 ok]', () => {
    cy.buscarAgendamento('12') //ids mudam o tempo todo, pode ser invalido às vezes (testar de 1-15)
    .then((respostaGet) => {
      expect(respostaGet.status).to.equal(200)
      console.log(respostaGet.body)
    })
  })

  it('Buscar TODOS os agendamentos [200 ok]', ( ) => {
    cy.buscarAgendamento('')
    .then((respostaGet) => {
      expect(respostaGet.status).to.equal(200)
      console.log(respostaGet.body)
    })
  })

  it('Agendamento caracteres inválidos [404 ok]', ( ) => {
    cy.buscarAgendamento('!@#$%¨&*')
    .then((respostaGet) => {
      expect(respostaGet.status).to.equal(404)
      expect(respostaGet.body).to.equal('Not Found')
    }) 
  }) 
    
  it('Agendamento NULL [404 ok]', ( ) => {
    cy.buscarAgendamento(null)
    .then((respostaGet) => {
      expect(respostaGet.status).to.equal(404)
      expect(respostaGet.body).to.equal('Not Found')
    }) 
  })

    it('Agendamento inexistente [404 ok]', ( ) => {
    cy.buscarAgendamento('wenmasduwe')
    .then((respostaGet) => {
      expect(respostaGet.status).to.equal(404)
      expect(respostaGet.body).to.equal('Not Found')
    }) 
  })
})