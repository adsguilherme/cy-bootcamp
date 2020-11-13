/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');
// Instantiate Chance so it can be used
let chance = new Chance();

When(/^informar meus dados$/, () => {
     // type -> é para digitar texto em um campo
     cy.get('input[placeholder="First Name"]').type(chance.first());
     cy.get('input[ng-model^=LastName]').type(chance.last());
     cy.get('input[ng-model^=EmailAdress]').type(chance.email());
     cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false}));
     
     // check -> radio's e checkboxes
     cy.get('input[value=FeMale]').check();
     cy.get('input[type=checkbox]').check('Cricket');
     cy.get('input[type=checkbox]').check('Hockey');

     // Select -> select e select2 (combos)
     cy.get('select#Skills').select('Javascript');
     cy.get('select#countries').select('Brazil');
     cy.get('select#country').select('Japan', {force: true});
     cy.get('select#yearbox').select('1986');
     cy.get('select[ng-model^=monthbox]').select('October');
     cy.get('select#daybox').select('5');

     cy.get('input#firstpassword').type('Ab1234');
     cy.get('input#secondpassword').type('Ab1234');

     // attachFile -> upload de arquivos
     cy.get('input#imagesrc').attachFile('upload.jpg');
	
});

When(/^salvar$/, () => {
    // Concluindo cadastro 
    cy.get('button#submitbtn').click();
	
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        console.log(resNewtable.status)
        cy.log(resNewtable.status)
        expect(resNewtable.status).to.eq(200)
    });
    
    cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.eq(200)
    });
    
    cy.wait('@getNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
    });

    cy.url().should('contain','WebTable');

	
});

