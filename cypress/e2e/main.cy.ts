import { beforeEach } from 'mocha';

/* eslint-disable sonarjs/no-duplicate-string */
describe('Main Entry', () => {
  describe('Pages', () => {
    it('Home Page', () => {
      cy.visit('http://localhost:3000/');
      cy.get('h1').should('contain.text', 'Chan Ka Tsun');
    });

    it('About Page', () => {
      cy.visit('http://localhost:3000/about');
      cy.get('h1').should('contain.text', 'About Me');
    });

    describe('Login Page', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/login');
      });

      it('Not authorized', () => {
        cy.get('h1').should('contain.text', 'Login to access secret features');
      });
    });
  });

  describe('Header', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Press About Page', () => {
      cy.get('header').get('p').contains('About').click();
      cy.get('h1').should('contain.text', 'About Me');
    });
  });

  describe('Footer', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Footer text', () => {
      const currentYear = new Date().getFullYear();

      cy.get('p').should('contain.text', currentYear);
    });

    it('Press About Link', () => {
      cy.get('header').get('p').contains('About Me').click();
      cy.get('h1').should('contain.text', 'About Me');
    });

    it('Press Tech Link', () => {
      cy.get('header').get('p').contains('Tech').click();
      cy.get('h1').should('contain.text', 'Technology');
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Theme Mode', () => {
      cy.viewport('iphone-x');
      cy.get('#mobile-nav-menu').click();
      cy.get('button').should('contain.text', 'Home');
    });
  });
});
