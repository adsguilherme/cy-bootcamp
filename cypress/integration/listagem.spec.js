/// <reference types="cypress" />

describe('Listagem', () => {
    it('Listagem sem registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-vazio'
        }).as('getNewtable');

        cy.visit('WebTable.html');

        //assert
        // should('have.length', 1) -> Mostre que tenha tamanho igual a 1 (1 seria a linha de cabeçalho da tabela).
        cy.get('div[role=row]').should('have.length', 1);
        
    });
    
    it('Listagem com registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixture:webtable-get-unico'

        }).as('getNewtable');
        
        cy.visit('WebTable.html');

        //assert
        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '1234567890');

    });
});