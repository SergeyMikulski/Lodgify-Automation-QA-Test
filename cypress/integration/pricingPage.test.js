/// <reference types="Cypress" />

import { pricingPageHelper } from '../support/pricingPageHelper';

const starterClass = '.plan-price-2';
const proClass = '.plan-price-1';
const ultimateClass = '.plan-price-3';

describe('Lodgify Pricing page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/pricing.html');
    })
    
    describe('Costs tests', () => {
        it('Yearly plan counts correct costs', () => {
            var rentalDisplays = '50'
            var starterExpected = '$64';
            var professionalExpected = '$375';
            var ultimateExpected = '$525';

            cy.wrap(null).then(() =>{
                pricingPageHelper.setRentalsNumber(rentalDisplays);
            }).then(() =>{
                pricingPageHelper.verifyPlansCosts(starterClass, proClass, ultimateClass, starterExpected, professionalExpected, ultimateExpected);
            })
        })
        it('Plans have correct currencies applied', () => {
            var currencies = ['gbp', 'eur', 'usd'];
            var currencySigns = ['£', '€', '$'];

            pricingPageHelper.verifyAllCurrenciesChanged(starterClass, proClass, ultimateClass, currencies, currencySigns);
        })
    })
})
  