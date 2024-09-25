describe('Central de Atendimento ao Cliente', () => {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {

        cy.visit('../src/index.html')
    })

    it('Exercicio 1 - Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.clock()

        cy.get('#firstName')
            .type('João')

        cy.get('#lastName')
            .type('Diniz')

        cy.get('#email')
            .type('joao@email.com.br')

        cy.get('#open-text-area')
            .type(longText, { delay: 0 })

        cy.contains('Enviar')
            .click()

        cy.get('.success')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS);

        cy.get('.success')
            .should('not.be.visible')
    });

    it('Exercicio extra 1 - função delay ao digitar textos grandes', () => {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis risus in ante vehicula venenatis et in ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin tincidunt non risus vel blandit. Nulla aliquam, metus eget mollis bibendum, nulla lectus auctor purus, eget sagittis felis ex a augue. Maecenas elementum euismod ligula id cursus. Nullam maximus sodales massa, id gravida ligula tempor facilisis. Proin ac blandit nibh.'

        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
    });

    it('Exercicio extra 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()

        cy.get('#firstName')
            .type('João')

        cy.get('#lastName')
            .type('Diniz')

        cy.get('#email')
            .type('joao@email,com.br')

        cy.get('#open-text-area')
            .type('Primeiro exercicio do curso')

        cy.contains('Enviar')
            .click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS);

        cy.get('.error')
            .should('not.be.visible')
    });

    it('Exercicio extra 3 - exibe mensagem de erro ao submeter letras no campo telefone', () => {
        const exemploNãoNúmerico = 'Teste'

        cy.get('#phone').type(exemploNãoNúmerico)
        cy.get('#phone').should('have.text', '')
    });

    it('Exercicio extra 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()

        cy.get('#firstName')
            .type('João')

        cy.get('#lastName')
            .type('Diniz')

        cy.get('#email')
            .type('joao@email.com.br')

        cy.get('#open-text-area')
            .type('Testando')

        cy.get('#phone-checkbox')
            .check()

        cy.get('.phone-label-span')
            .should('be.visible')

        cy.contains('Enviar')
            .click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS);

        cy.get('.error')
            .should('not.be.visible')
    });

    it('Exercicio extra 5 - preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('João')
            .should('have.value', 'João')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Diniz')
            .should('have.value', 'Diniz')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('joao@email.com.br')
            .should('have.value', 'joao@email.com.br')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('40028922')
            .should('have.value', '40028922')
            .clear()
            .should('have.value', '')

    });

    it('Exercicio extra 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.get('button[type="submit"]')
            .click()

        cy.get('.error')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS);

        cy.get('.error')
            .should('not.be.visible')
    });

    it('Exercicio extra 7 - utilizando comando personalizado do cypress', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS);

        cy.get('.success')
            .should('not.be.visible')
    });

    it('Seleção Suspensa | Seleciona um produto (Youtube) pelo texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('Seleção Suspensa | Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('Seleção Suspensa | Seleciona um produto (Blog) por seu valor (value)', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('Inputs tipo Radio | Marca o tipo de atendimento feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    it('Inputs tipo Radio | Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('Inputs tipo Checkbox | Marca todos os checkboxes e desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('Upload de arquivos | Seleciona um arquivo da pasta fixture', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Upload de arquivos | Seleciona um arquivo simulando drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Upload de arquivos | Seleciona um arquivo utilizando um alias em uma fixture', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('Links que abrem em outra aba | Verifica que a politica de privacidade abre em outra aba sem necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('Links que abrem em outra aba | Acessa a página  da politica de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
          
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      });

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    });

    it('faz uma requisição HTTP', () => {
        cy.request('http://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function(response){
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    });

    it.only('Desafio | Achando o gato na aplicação', () => {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    });

})