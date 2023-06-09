context('Basic', () => {
  beforeEach(() => {
    cy.visit('/admin/login')
  })

  it('Should success test', () => {
    expect(true).to.equal(true)
  })
})
