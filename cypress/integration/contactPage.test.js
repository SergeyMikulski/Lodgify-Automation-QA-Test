/// <reference types="Cypress" />

import { contactPageHelper } from '../support/contactPageHelper';

const namePath = '[name="name"]';
const phonePath = '[name="phone"]';
const emailPath = '[name="email"]';
const commentPath = '[placeholder="Comment"]';
const mandatoryTooltipClass = '.red.pointing';
const sendButtonPath = 'button.right';

const dateRangePickerClass = '.DateRangePickerInput_calendarIcon';

describe('Lodgify Contact page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/contact.html');
    })
    
    describe('Contact tests', () => {
        it('Verify Contact Mandatory Fields', () => {
            var nameField = 'Name';
            var emailField = 'Email';
            var commentField = 'Comment';
            var phoneField = 'Phone';

            cy.get(sendButtonPath).click().then(() =>{
                contactPageHelper.verifyFieldIsMandatory(nameField, namePath, mandatoryTooltipClass);
                contactPageHelper.verifyFieldIsMandatory(emailField, emailPath, mandatoryTooltipClass);
                contactPageHelper.verifyFieldIsMandatory(commentField, commentPath, mandatoryTooltipClass);
                contactPageHelper.verifyFieldIsMandatory(phoneField, phonePath, mandatoryTooltipClass);
            })
        })
        it('Verify Contact Mandatory Fields tooltips disappear on adding text', () => {
            cy.get(sendButtonPath).click().then(() =>{
                contactPageHelper.addLoremIpsum(commentPath)
                contactPageHelper.addName(namePath)
                contactPageHelper.addEmail(emailPath)
                contactPageHelper.addPhone(emailPath)
            }).then(() => {
                contactPageHelper.verifyIsMandatoryTooltipHidden(namePath, mandatoryTooltipClass);
                contactPageHelper.verifyIsMandatoryTooltipHidden(emailPath, mandatoryTooltipClass);
                contactPageHelper.verifyIsMandatoryTooltipHidden(commentPath, mandatoryTooltipClass);
                contactPageHelper.verifyIsMandatoryTooltipHidden(phonePath, mandatoryTooltipClass);
            })
        })
        it('Choose correct day in Calendar', () => {
            var startDay = '14';
            var startMonth = 'April';

            var endDay = '14';
            var endMonth = 'June';

            var isSecondDateChoosing = true;

            cy.get(dateRangePickerClass).click().then(() =>{
                contactPageHelper.chooseCalendarDate(startDay, startMonth, !isSecondDateChoosing);
            }).then(() =>{
                contactPageHelper.chooseCalendarDate(endDay, endMonth, isSecondDateChoosing);
            }).then(() =>{
                contactPageHelper.verifyCalendarFieldsHaveCorrectDates(startDay, startMonth, endDay, endMonth)
            })
        })
    })
})
  