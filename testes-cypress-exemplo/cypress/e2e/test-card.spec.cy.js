/// <reference types="cypress"/>

describe('Gerar card virficando quantidade e valores', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('testar header verificar se extiste Dog CEO', () => {
    cy.get('#teste-titulo').should('include.text', 'Dog CEO')
  })

  it('Mudar os cards ao clicar no botão gerar novamente', () => {
    cy.get('[data-testeid="regenerate-button"]').click()
    cy.get('.card').should('have.length', 10)
  })

  it('Ao clicar no botão gerar novamanet os cards devem ser diferentes', () => {
    cy.get('.card').should('have.length', 10).as('initialCards')
    cy.get('[data-testeid="regenerate-button"]').click()
    cy.get('.card').should('have.length', 10).as('newCards')
    cy.get('@initialCards').should('not.deep.equal', cy.get('@newCards'))
  })
})

describe('Filtros do Card', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Filtra ao digitar uma raça no input', () => {

    cy.wait(2000)
    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedToFilter')

    cy.get('@breedToFilter').then((breedToFilter) => {
      cy.get('[data-testId="filter-breed-input"]').type(breedToFilter)
    })

    cy.get('.card').should('have.length.gte', 1)//pelo menos 1
    cy.get('.card').should('have.length.lessThan', 11)//menos que 11

    cy.get('@breedToFilter').then((breedToFilter) => {
      cy.contains(breedToFilter)
    })


  })
})

describe('gestão de dogs favoritos', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('adiciona um card na lista de favoritos', () => {

    cy.wait(2000)

    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedText', { type: 'static' })

    // { type: 'static' } é para garantir que o valor capturado não será alterado

    cy.get('.card').first().contains('Favoritar').click()

    cy.get('@breedText').then((breedText) => {
      console.log(breedText);

      cy.contains(breedText).should('not.exist')
    })

    cy.get('[data-testid="go-to-favorites-button"]').click()

    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })

  })

  it('remove um card da lista de favoritos', () => {
    cy.wait(2000)

    cy.get('.card p').first().invoke('text').as('breedText', { type: 'static' })

    cy.get('.card').first().contains('Favoritar').click()

    cy.get('[data-testid="go-to-favorites-button"]').click()

    cy.get('.card').first().contains('Remover').click()

    cy.get('@breedText').then((breedText) => {
      console.log(breedText);

      cy.contains(breedText).should('not.exist')
    })

    cy.get('[data-testid="go-to-homepage-button"]').click()

    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })

  })
})

describe('gestão do local storage', () => {

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('salva lista de favoritos', () => {

    cy.wait(2000)

    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedText', { type: 'static' })

    cy.get('.card').first().contains('Favoritar').click()

    cy.get('[data-testid="go-to-favorites-button"]').click()

    cy.get('button').contains('Salvar no local storage').click()

    cy.reload()

    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })
  })

  it('limpa lista de favoritos', () => {

    cy.wait(2000)

    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedText', { type: 'static' })

    cy.get('.card').first().contains('Favoritar').click()

    cy.get('[data-testid="go-to-favorites-button"]').click()

    cy.get('button').contains('Salvar no local storage').click()

    cy.reload()

    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })

    cy.get('button').contains('Limpar local storage').click()

    cy.reload()

    cy.get('.card').should('not.exist')

  })

})
