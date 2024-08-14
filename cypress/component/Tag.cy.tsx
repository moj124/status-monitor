import { mount } from 'cypress/react';
import Tag from '../../src/components/Tag';
import React from 'react';

describe('Tag Component', () => {
  it('renders the Tag component with text', () => {
    mount(<Tag name="Important" />);
    cy.contains('Important').should('be.visible');
  });

  it('renders the Tag component with .tag__status styles', () => {
    mount(<Tag name="Important" />);
    cy.get('.tag__status')
    .should('have.css', 'color', 'rgb(255, 255, 255)')
    .should('have.css', 'font-size', '16px')
    .should('have.css', 'padding', '4px');
  });

  it('renders the Tag component with background error styles', () => {
    mount(<Tag name="Important" status={false}/>);
    cy.get('.tag__status')
    .should('have.class', 'background--error');
  });

  it('renders the Tag component with background error styles', () => {
    mount(<Tag name="Important" status={true}/>);
    cy.get('.tag__status')
    .should('have.class', 'background--success');
  });

  it('renders the Tag component with background success styles', () => {
    mount(<Tag name="Important" modifier="background--success"/>);
    cy.get('.tag__status')
    .should('have.class', 'background--success');
  });

  it('renders the Tag component with background warning styles', () => {
    mount(<Tag name="Important" modifier="background--warning"/>);
    cy.get('.tag__status')
    .should('have.class', 'background--warning');
  });

  it('renders the Tag component with background error styles', () => {
    mount(<Tag name="Important" modifier="background--error"/>);
    cy.get('.tag__status')
    .should('have.class', 'background--error');
  });

  it('throws an error when both status and modifier are provided', () => {
    const errorHandler = cy.stub().as('errorHandler');

    mount(<Tag name="Important" status={true} modifier="custom-class" onError={errorHandler} />);

    cy.get('@errorHandler').should('have.been.calledWith', 'You cannot use both status and modifier props simultaneously.');
  });
});