/// <reference types="cypress" />

// Load Chance
let Chance = require('chance');
// Instantiate Chance so it can be used
let chance = new Chance();


//describe ou context
describe('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // rotas
        // POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X

        cy.server();

        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable');
        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postUsertable');
        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');


        // baseUrl + rota
        cy.visit('Register.html');

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

        // Concluindo cadastro 
        cy.get('button#submitbtn').click();

        // Asserts
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
});




