describe('Cenarios com POST Login + DELETE Booking', () => {
  let token = null
  var bookingID = ''
  const postPayload = require('../fixtures/bookingUpdateBody.json')
//1. CRIAR TOKEN COM LOGIN
  before('Login/Criar token' , () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      body: {
        "username": "admin",
        "password": "password123"
      }
    }).then((responseLogin) => {
      expect(responseLogin.status).to.equal(200)
      token = responseLogin.body.token
    })
  })
//2. CRIAR AGENDAMENTO 
  it('POST agendamento [200 ok]', () => {
      cy.request({
      method:'POST',
      url:'https://restful-booker.herokuapp.com/booking',
      body: postPayload
      }).then((resposta) => {
        expect(resposta.status).to.equal(200)
        expect(resposta.body.bookingid).to.be.a('number')
        expect(resposta.body.booking.totalprice).to.equal(postPayload.totalprice)
        expect(resposta.body.booking.firstname).to.equal(postPayload.firstname)
        expect(resposta.body.booking.lastname).to.equal(postPayload.lastname)
        bookingID = resposta.body.bookingid
    })
  })
//3. DELETAR E CONFIRMAR O DELETE
  it('DELETAR agendamento [201 ok]', () => {
      cy.request({
      method:'DELETE',
      body: { },
      headers:{
        "Cookie":`token=${token}`,
      },
      url: `https://restful-booker.herokuapp.com/booking/${bookingID}`
      }).then((respostaDelete) => {
        expect(respostaDelete.status).to.equal(201)
        expect(respostaDelete.body).to.equal('Created')
     })
  })
})
