/// <reference types="Cypress" />

class PricingPageHelper{
    setRentalsNumber(rentalsNumber){
        var numberOfRentalsFieldId = '#scroll-prop-plan';
        var yearlyOptionPath = '[data-price-period="2"]';

        cy.get(yearlyOptionPath).click().then(() =>{
            cy.get(numberOfRentalsFieldId).clear().type(rentalsNumber);
        });
    }

    verifyPlansCosts(starterClass, proClass, ultimateClass, starterExpected, professionalExpected, ultimateExpected){
        cy.get(starterClass).should('have.text', starterExpected);
        cy.get(proClass).should('have.text', professionalExpected);
        cy.get(ultimateClass).should('have.text', ultimateExpected);
    }

    setCurrency(selectionCurrency){
        cy.get('select').select(selectionCurrency);
    }

    verifyCurrencyChanged(starterClass, proClass, ultimateClass, currency, currencySign){
        var totalSumClass = '.total-sum';
        var starterSumClass = `${starterClass} ${totalSumClass}`;
        var proSumClass = `${proClass} ${totalSumClass}`;
        var ultimateSumClass = `${ultimateClass} ${totalSumClass}`;

        var _starterSum = '';
        var _proSum = '';
        var _ultimateSum = '';

        cy.get(starterSumClass).invoke('text').then(starterSum =>{
            _starterSum = starterSum;
        }).then(() =>{
            cy.get(proSumClass).invoke('text').then(proSum =>{
                _proSum = proSum;
            })
        }).then(() =>{
            cy.get(ultimateSumClass).invoke('text').then(ultimateSum =>{
                _ultimateSum = ultimateSum;
            })
        })
        .then(() =>{
            this.setCurrency(currency);
        })
        .then(() =>{
            this.checkCurrencyChanged(starterClass, starterSumClass, proClass, proSumClass, ultimateClass, ultimateSumClass, _starterSum, _proSum, _ultimateSum, currencySign);
        })
    }

    checkCurrencyChanged(starterClass, starterSumClass, proClass, proSumClass, ultimateClass, ultimateSumClass, _starterSum, _proSum, _ultimateSum, currencySign){
        cy.wrap(null).then(() =>{
            cy.get(starterClass).should('contain.text', currencySign);
            cy.get(starterSumClass).should('not.have.text', _starterSum);
        }).then(() =>{
            cy.get(proClass).should('contain.text', currencySign);
            cy.get(proSumClass).should('not.have.text', _proSum);
        }).then(() =>{
            cy.get(ultimateClass).should('contain.text', currencySign);
            cy.get(ultimateSumClass).should('not.have.text', _ultimateSum);
        })
    }

    verifyAllCurrenciesChanged(starterClass, proClass, ultimateClass, currencies, currencySigns){
        currencies.forEach((currency, i) => {
            this.verifyCurrencyChanged(starterClass, proClass, ultimateClass, currency, currencySigns[i])
        })
    }
}

export const pricingPageHelper = new PricingPageHelper()