describe('Filling out form and submitting', () => {

    beforeEach(() => {
        cy.visit(`http://localhost:3000`)
    })

    const submitBtn = () => cy.get('#submitBtn')
    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passInput = () => cy.get('input[name=password]')
    const termsBox = () => cy.get('input[name=serviceTerms]')

    it('The submit button is disabled at start of form', () => {
        submitBtn().should('be.disabled')
    })

    it('Can type in the inputs', () => {
        nameInput().should('have.value', '')
        emailInput().should('have.value', '')
        passInput().should('have.value', '')
        nameInput().type('Marcos')
        emailInput().type('marcsaaved96@gmail.com')
        passInput().type('markhalil1')
        nameInput().should('have.value', 'Marcos')
        emailInput().should('have.value', 'marcsaaved96@gmail.com')
        passInput().should('have.value', 'markhalil1')
    })

    it('Can check the terms of service checkbox', () => {
        termsBox().click()
    })

    it('Can submit form if correctly filled out', () => {
        nameInput().type('Marcos')
        emailInput().type('marcsaaved96@gmail.com')
        passInput().type('markhalil1')
        termsBox().click()
        submitBtn().click()
    })

    it('Cannot submit form if incorrectly filled out', () => {
        nameInput().type('Marcos')
        passInput().type('markhalil1')
        termsBox().click()
        submitBtn().should('be.disabled')
    })
})