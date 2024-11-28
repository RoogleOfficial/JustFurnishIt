/// <reference types="cypress" />
import { mount } from 'cypress/react18';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Footer from '../../Components/Common/Footer'; // Adjust the import path to your Footer component

describe('Footer Component', () => {
  beforeEach(() => {
    // Mount the Footer component within MemoryRouter to provide routing context
    mount(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('should display the logo and company name', () => {
    cy.get('footer').within(() => {
      cy.get('img[alt="JustFurnishIt Logo"]').should('be.visible');
      cy.contains('JustFurnishIt').should('be.visible');
    });
  });

  it('should display social media icons', () => {
    cy.get('footer').within(() => {
      cy.get('[aria-label="Facebook"]').should('be.visible');
      cy.get('[aria-label="Instagram"]').should('be.visible');
      cy.get('[aria-label="Twitter"]').should('be.visible');
      cy.get('[aria-label="LinkedIn"]').should('be.visible');
    });
  });

  it('should display pages section with correct links', () => {
    cy.get('footer').within(() => {
      cy.contains('Pages').should('be.visible');
      cy.get('a[href="/about-us"]').should('contain', 'About Us');
      cy.get('a[href="/how-its-work"]').should('contain', 'How it Works');
      cy.get('a[href="/contactus"]').should('contain', 'Contact Us');
      cy.get('a[href="/design-ideas"]').should('contain', 'Designs');
    });
  });

  it('should display services section with correct links', () => {
    cy.get('footer').within(() => {
      cy.contains('Services').should('be.visible');
      cy.get('a[href="/design-ideas/modular-kitchen-designs"]').should('contain', 'Kitchen');
      cy.get('a[href="/design-ideas/living-room-designs"]').should('contain', 'Living Area');
      cy.get('a[href="/design-ideas/bathroom-designs"]').should('contain', 'Bathroom');
      cy.get('a[href="/design-ideas/dining-room-designs"]').should('contain', 'Dining Hall');
      cy.get('a[href="/design-ideas/master-bedroom-designs"]').should('contain', 'Bedroom');
    });
  });

  it('should display the contact information', () => {
    cy.get('footer').within(() => {
      cy.contains('Contact').should('be.visible');
      cy.contains('55 East Malleshwaram. Bengaluru,Karnataka 560003').should('be.visible');
      cy.contains('contact@justfurnishit.com').should('be.visible');
      cy.contains('+91 6360914287').should('be.visible');
    });
  });

  it('should display bottom links with correct paths', () => {
    cy.get('footer').within(() => {
      cy.get('a[href="/terms"]').should('contain', 'Terms & Conditions');
      cy.get('a[href="/privacy"]').should('contain', 'Privacy Policy');
      cy.get('a[href="/cookies"]').should('contain', 'Cookies Policy');
      cy.get('a[href="/faq"]').should('contain', 'FAQ');
    });
  });

  it('should display copyright information', () => {
    cy.get('footer').within(() => {
      cy.contains('Copyright © JustFurnishIt | Designed by JustFurnishIt').should('be.visible');
    });
  });
});
