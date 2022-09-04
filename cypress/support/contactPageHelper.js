/// <reference types="Cypress" />

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

class ContactPageHelper{
    verifyFieldIsMandatory(fieldName, fieldPath, tooltipPath){
        var tooltipTextExpected = `${fieldName} is mandatory`;
        cy.get(fieldPath).parent().find(tooltipPath).should('contain.text', tooltipTextExpected);
    }

    addLoremIpsum(fieldPath){
        var loremIpsumURL = 'https://www.blindtextgenerator.com/text.php?textname=ANY-lorem';
        cy.request(loremIpsumURL).then(lorem =>{
            cy.get(fieldPath).type(lorem.body.slice(0, 20));
        })
    }

    addName(fieldPath){
        cy.get(fieldPath).type('user');
    }

    addEmail(fieldPath){
        cy.get(fieldPath).type('user@user.com');
    }

    addPhone(fieldPath){
        cy.get(fieldPath).type('298459752');
    }

    verifyIsMandatoryTooltipHidden(fieldPath, tooltipPath){
        cy.get(fieldPath).parent().find(tooltipPath).should('not.exist');
    }

    chooseCalendarDate(day, month, isSecondDateChoosing){
        var calendarPopUpPath = '.CalendarMonth[data-visible="true"]';
        var monthPath = `${calendarPopUpPath} .CalendarMonth_caption`;
        var rightArrowPath = '.DayPickerNavigation_rightButton__horizontalDefault_5';
        var dayPath = '.CalendarDay';

        var difference = 0;
        cy.get(monthPath).eq(0).invoke('text').then(calendarMonth => {
            difference = Number.parseInt(this.getMonthDifference(calendarMonth.slice(0, -5), month));

            if(isSecondDateChoosing == false){
                difference -= 1;
            }

            for(var i = 0; i < difference; i++){
                cy.get(rightArrowPath).click();
            }
        }).then(() =>{
            var rightLeftCalendarPartIndex = 0;
            if((difference > 0) && (isSecondDateChoosing == false)){
                rightLeftCalendarPartIndex = 1;
            }

            cy.get(calendarPopUpPath).eq(rightLeftCalendarPartIndex).find(dayPath).each(calendarDay =>{
                if(calendarDay.text() == day){
                    calendarDay.trigger('click');
                }
            })

        })
    }

    getMonthDifference(monthFromCalendar, monthToSet){
        var calendarIndex = monthNames.indexOf(monthFromCalendar);
        var setIndex = monthNames.indexOf(monthToSet);

        var difference = setIndex - calendarIndex;
        if (difference < 0){
            difference += 12;
        }

        return difference;
    }

    verifyCalendarFieldsHaveCorrectDates(startDay, startMonth, endDay, endMonth){
        var calendarStartPath = '[aria-label="Arrival"]';
        var calendarEndPath = '[aria-label="Departure"]';
        cy.get(calendarStartPath).invoke('val').then(value =>{
            var dateArray = value.toString().split('/');
            var date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            assert.isTrue(date.getDate().toString() == startDay, `startDay ${startDay} should be equal to day from date ${date.getDate().toString()}`);
            assert.isTrue(monthNames[date.getMonth()] == startMonth, `startMonth ${startMonth} should be equal to month from date ${monthNames[date.getMonth()]}`);
        }).then(() =>{
            cy.get(calendarEndPath).invoke('val').then(value =>{
                var dateArray = value.toString().split('/');
                var date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                assert.isTrue(date.getDate().toString() == endDay, `endDay ${endDay} should be equal to day from date ${date.getDate().toString()}`);
                assert.isTrue(monthNames[date.getMonth()] == endMonth, `endMonth ${endMonth} should be equal to month from date ${monthNames[date.getMonth()]}`);
            })
        })
    }
}

export const contactPageHelper = new ContactPageHelper()