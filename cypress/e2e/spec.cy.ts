describe('Burger Constructor', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Click header links', () => {
    cy.get('a').contains("Конструктор").click()
    cy.get('a').contains("Лента заказов").click()
    cy.get('a').contains("Личный кабинет").click()
  })

  it('Click ingredients tabs', () => {
    cy.visit('/')
    cy.get('[data-testid=ingredient-tabs]').click({ force: true, multiple: true })
  })

  it('Click ingredient, open and close modal', () => {
    cy.visit('/')
    cy.get('[data-testid=ingredient]').first().click()
    cy.get('body').type('{esc}')
  })

  const dragAndDrop = (i: number) => {
    cy.get('[data-testid=ingredient]')
      .eq(i)
      .trigger('dragstart')
    cy.get('[data-testid=constructor]')
      .trigger('drop')
  }

  it('Drag and Drop', () => {
    cy.visit('/')
    cy.wait(5000);
    dragAndDrop(0)
    dragAndDrop(3)
    dragAndDrop(7)
    dragAndDrop(10)
  })

  it('Make order', () => {
    cy.visit('/')
    cy.wait(5000);
    dragAndDrop(0)
    dragAndDrop(3)
    dragAndDrop(7)
    dragAndDrop(10)
    cy.get('button')
      .contains('Оформить заказ')
      .click()
    cy.location('pathname', { timeout: 60000 })
      .should('include', '/login')
    cy.get('input[name=email]').type('ilya@test.ru')
    cy.get('input[name=password]').type('123456')
    cy.get('button').contains('Войти').click()
    cy.location('pathname', { timeout: 60000 })
      .should('not.include', '/login')
    cy.get('[data-testid=order_number]', { timeout: 60000 })
      .should(($item) => {
        expect($item.text()).not.to.equal("")
      })
  })
})
