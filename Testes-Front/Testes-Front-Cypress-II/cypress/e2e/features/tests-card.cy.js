/// <reference types="cypress"/>

describe('Gerar card virficando quantidade e valores', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('testar header', () => {
    //cy.get('#teste-titulo').should('have.text', 'Dog CEO - gerador de dogs aleatórios')
    cy.get('#teste-titulo').should('include.text', 'Dog CEO')
  })

  it('Mudar os cards ao clicar no botão gerar novamente', () => {
    cy.get('[data-testid="regenerate-button"]').click()
    cy.get('.card').should('have.length', 10)
  })

  it('Ao clicar no botão gerar novamanet os cards devem ser diferentes', () => {
    cy.get('.card').should('have.length', 10).as('initialCards')
    cy.get('[data-testid="regenerate-button"]').click()
    cy.get('.card').should('have.length', 10).as('newCards')
    cy.get('@initialCards').should('not.deep.equal', cy.get('@newCards'))
  })
})

describe('Filtros do Card', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Filtra ao digitar uma raça no input', () => {
      // espere a página carregar os cards completamente
    cy.wait(2000)

     // selecione o texto da raça do primeiro card (usaremos para filtrar)
    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedToFilter')

    // vem como elemento DOM, para usar é precisa do then
    // valor acessado somente quando disponível
    // assincronicidade

    // escreve a raça no input de pesquisa
    cy.get('@breedToFilter').then((breedToFilter) => {
      cy.get('[data-testId="filter-breed-input"]').type(breedToFilter)
    })

    //na pesquisa precisa retornar pelo menos 1 card e no mínimo 10 cards
    cy.get('.card').should('have.length.gte', 1) //pelo menos 1
    cy.get('.card').should('have.length.lessThan', 11) //menos que 11 itens


    cy.get('@breedToFilter').then((breedToFilter) => {
      //console.log(breedToFilter);
      cy.contains(breedToFilter)
    })


  })

})

describe('gestão de dogs favoritos', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('adiciona um card na lista de favoritos', () => {

    // espere a página carregar os cards completamente
    cy.wait(2000)

    // selecione o texto da raça do primeiro card
    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedText', { type: 'static' })
    // { type: 'static' } é para garantir que o valor capturado não será alterado

    // selecione o primeiro card e clique em seu botão de favoritar
    cy.get('.card').first().contains('Favoritar').click()

    // confirme que o card escolhido não é mais renderizado na homepage
    cy.get('@breedText').then((breedText) => {
      console.log(breedText);

      cy.contains(breedText).should('not.exist') //verifica se o texto não existe no card
    })

    /* selecione o botão de navegação para página de favoritos
        através do atributo data-testid e clique nele */
    cy.get('[data-testid="go-to-favorites-button"]').click()

    // confirme que o card escolhido agora é renderizado na página favoritos
    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })
  })

  it('remove um card da lista de favoritos', () => {

    // espere a página carregar os cards completamente
    cy.wait(2000)

    // selecione o texto da raça do primeiro card
    cy.get('.card p').first().invoke('text').as('breedText', { type: 'static' })

    // selecione o primeiro card e clique em seu botão de favoritar
    cy.get('.card').first().contains('Favoritar').click()

    /* selecione o botão de navegação para página de favoritos
        através do atributo data-testid e clique nele */
    cy.get('[data-testid="go-to-favorites-button"]').click()

    // selecione o primeiro card e clique em seu botão de remover dos favoritos
    cy.get('.card').first().contains('Remover').click()

    // confirme que o card escolhido não é mais renderizado na página favoritos
    cy.get('@breedText').then((breedText) => {
      console.log(breedText);

      cy.contains(breedText).should('not.exist')
    })

    /* selecione o botão de navegação para página homepage 
        através do atributo data-testid e clique nele */
    cy.get('[data-testid="go-to-homepage-button"]').click()

    // confirme que o card voltou a ser renderizado na página homepage
    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })
  })

})

describe('gestão do local storage', () => {
  // antes de cada teste, limpe o local storage
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('salva lista de favoritos', () => {
    // espere a página carregar os cards completamente
    cy.wait(2000)

    // selecione o texto da raça do primeiro card
    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedText', { type: 'static' })

    // selecione o primeiro card e clique em seu botão de favoritar
    cy.get('.card').first().contains('Favoritar').click()

    /* selecione o botão de navegação para página de favoritos
        através do atributo data-testid e clique nele */
    cy.get('[data-testid="go-to-favorites-button"]').click()

    /* selecione o botão de salvar favoritos no local storage
        através do atributo data-testid e clique nele */
    cy.get('button').contains('Salvar no local storage').click()

    // recarregue a página favoritos
    cy.reload()

    // confirme que o card escolhido continua sendo renderizado na página favoritos
    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })
  })

  it.only('limpa lista de favoritos', () => {

    // espere a página carregar os cards completamente
    cy.wait(2000)

    // selecione o texto da raça do primeiro card
    cy.get('.card [data-breedTestId="test-breed-card"]').first().invoke('text').as('breedText', { type: 'static' })

    // selecione o primeiro card e clique em seu botão de favoritar
    cy.get('.card').first().contains('Favoritar').click()

    /* selecione o botão de navegação para página de favoritos
        através do atributo data-testid e clique nele */
    cy.get('[data-testid="go-to-favorites-button"]').click()

    /* selecione o botão de salvar favoritos no local storage
        através do atributo data-testid e clique nele */
    cy.get('button').contains('Salvar no local storage').click()

    // recarregue a página favoritos
    cy.reload()

    //Verifica se o texto existe
    cy.get('@breedText').then((breedText) => {
      cy.contains(breedText).should('exist')
    })

    /* selecione o botão de limpar favoritos do local storage
        através do atributo data-testid e clique nele */
    cy.get('button').contains('Limpar local storage').click()

    // recarregue a página favoritos
    cy.reload()

    // confirme que nenhum card é renderizado na página favoritos
    cy.get('.card').should('not.exist')
  })
})