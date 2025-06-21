describe('Cenarios com POST Booking', () => {
  it('POSTar agendamento [200 ok]', () => {
//FUNCIONANDO OK
    const postPayload = require('../fixtures/bookingPostBody.json')

    cy.cadastrarAgendamento(postPayload)
    .then((respostaPost) => {
      cy.buscarAgendamento(respostaPost.body.bookingid).then((respostaGet) => {
        expect(respostaGet.status).to.equal(200)
        expect(respostaGet.body.firstname).equal(postPayload.firstname);
        expect(respostaGet.body.lastname).equal(postPayload.lastname);
        expect(respostaGet.body.totalprice).equal(postPayload.totalprice);
        expect(respostaGet.body.depositpaid).equal(postPayload.depositpaid)
        expect(respostaGet.body.bookingdates.checkin).equal(postPayload.bookingdates.checkin)
        expect(respostaGet.body.bookingdates.checkout).equal(postPayload.bookingdates.checkout)
        expect(respostaGet.body.additionalneeds).equal(postPayload.additionalneeds)
      })
    })
  }) 
})