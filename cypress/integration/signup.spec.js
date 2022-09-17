import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', function() {

    /*before(function(){
        cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes') 
    })*/
    /*  after(function(){
      cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes') 
  })

  afterEach(function(){
      cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste') 
  }) */

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('User should be deliverer', function() {

        var deliver = signupFactory.deliver()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signup.go()
        signup.fillform(deliver)
        signup.submit()
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = 'x00000141AA'

        signup.go()
        signup.fillform(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')

    })

    it('Incorrect email', function () {

        var deliver = signupFactory.deliver()
        deliver.email = 'jaqueline.com.br'

        signup.go()
        signup.fillform(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')

    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function() {
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function() {
                SignupPage.alertMessageShouldBe(msg.output)
            })

        })

    })

})