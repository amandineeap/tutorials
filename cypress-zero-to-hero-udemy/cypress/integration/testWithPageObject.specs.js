import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutPage } from "../support/page_objects/formLayoutPage";
import { onDatePickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('Test with Page Objects', ()=>{
    
    beforeEach('open application', ()=>{
        cy.openHomePage()
    })

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
    })

    it('should submit inline and basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('Amandine', 'test@test.com')
        onFormLayoutPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')

        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        // onDatePickerPage.selectDatepickerWithRangeFromtoday(7, 14)
    })

    it('should update table', () => {
        navigateTo.smartTablePage()
        onSmartTablePage.updateAgeByFirstName('Larry', 25)
        onSmartTablePage.addNewRecordWithFirstAndLastName('John', 'Doe')
        onSmartTablePage.deleteRowByIndex(1)
    })
})