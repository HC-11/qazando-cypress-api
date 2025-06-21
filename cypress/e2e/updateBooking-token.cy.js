///<reference types="cypress"/>

describe('Cenarios com PUT booking', () => {
  let token = null
  var bookingID = ''

  before('Login' , () => {
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

  beforeEach('Criar agendamento', () => {
    cy.request({
      method:'POST',
      url:'https://restful-booker.herokuapp.com/booking',
      body: {
        "firstname": "Gilberto",
        "lastname": "Maranhao",
        "totalprice": 2500,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2025-01-04",
            "checkout": "2025-01-09"
        },
        "additionalneeds": "2 beds, Breakfast in bed"
      }
      }).then((resposta) => {
        expect(resposta.status).to.equal(200)
        expect(resposta.body.bookingid).to.be.a('number')
        expect(resposta.body.booking.totalprice).to.equal(2500)
        expect(resposta.body.booking.firstname).to.equal('Gilberto')
        expect(resposta.body.booking.lastname).to.equal('Maranhao')
        bookingID = resposta.body.bookingid
    })
  })

  it('PUT/Update agendamento [200 ok]', () => {
    cy.request({
      method: 'PUT',
      body: {
        "firstname": "Napoleao",
        "lastname": "M. de Almeida",
        "totalprice": 1750,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2025-04-01",
            "checkout": "2025-04-07"
        },
        "additionalneeds": "Breakfast"
      },
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Cookie":`token=${token}`,
      },
      url: `https://restful-booker.herokuapp.com/booking/${bookingID}`, //id manual
      failOnStatusCode: false
    })
    .then((respostaPut) => {
      expect(respostaPut.status).to.equal(200)
      expect(respostaPut.body.totalprice).to.equal(1750)
      expect(respostaPut.body.firstname).to.equal('Napoleao')
      expect(respostaPut.body.lastname).to.equal('M. de Almeida')
    })
  })

  it('PUT agendamento SEM TOKEN [400 ok]', () => {
    cy.request({
      method: 'PUT',
      body: {
  "firstname": "Napoleao",
  "lastname": "M. de Almeida",
  "totalprice": 1750,
  "depositpaid": true,
  "bookingdates": {
      "checkin": "2025-04-01",
      "checkout": "2025-04-07"
  },
  "additionalneeds": "Breakfast"
},
headers:{
  "Content-Type":"application/json",
  "Accept":"application/json",
},
      url: `https://restful-booker.herokuapp.com/booking/${bookingID}`, 
      failOnStatusCode: false
    })
  }) 

    it('PUT agendamento TOKEN INVÁLIDO [400 ok]', () => {
    cy.request({
      method: 'PUT',
      body: {
          "firstname": "Napoleao",
          "lastname": "M. de Almeida",
          "totalprice": 1750,
          "depositpaid": true,
          "bookingdates": {
            "checkin": "2025-04-01",
            "checkout": "2025-04-07"
          },
          "additionalneeds": "Breakfast"
        },
        headers:{
        "Content-Type":"application/json",
          "Accept":"application/json",
          "Cookie":"token=!@#$%&**&%$#@!"
        },
        url: `https://restful-booker.herokuapp.com/booking/${bookingID}`, 
        failOnStatusCode: false
    })
  })
})