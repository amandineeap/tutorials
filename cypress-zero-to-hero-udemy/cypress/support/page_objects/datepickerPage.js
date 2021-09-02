const selectDayFromCurrent = (day)=>{

    let date = new Date()
    date.setDate(date.getDate() - day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {month: 'short'})        
    let dateAssert = futureMonth + ' ' + futureDay + ', ' + (date.getFullYear()+1)

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if(!dateAttribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
            // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }else{
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert
}
        
export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dayFromToday){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday+1)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })
    }

    //  selectDatepickerWithRangeFromtoday(firstDay, secondDay){
    //     cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
    //         cy.wrap(input).click()
    //         let dateAssertFirst = selectDayFromCurrent(firstDay+1)
    //         let dateAssertSecond = selectDayFromCurrent(secondDay+1)
    //         const finalDate = dateAssertFirst+ ' - ' + dateAssertSecond
    //         cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
    //         cy.wrap(input).should('have.value', finalDate)
    //     })
    // }
}

export const onDatePickerPage = new DatepickerPage()

