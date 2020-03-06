'use strict'

import Rest from '@classes/util/rest'

const selectors = {
  inputFirstName: 'checkout-field[params*="data: userFirstNameParams"]>div>div[class*="form-group"]>input',
  inputLastName: 'checkout-field[params*="data: userSecondNameParams"]>div>div[class*="form-group"]>input',
  inputPhoneNumber: 'checkout-field[params*="data: userPhoneParams"]>div>div[class*="form-group"]>input',
  inputEmailParams: 'checkout-field[params*="UserEmailParams"]>div>div[class*="form-group"]>input',
}

export default class CheckoutPage extends Rest {
    static getSelectors = () => selectors

    async fillCheckoutTakeAwayData(firstName: string, lastName: string, phoneNumber: string, email: string) {
      await super.type(selectors.inputFirstName, firstName)
      await super.type(selectors.inputLastName, lastName)
      await super.type(selectors.inputPhoneNumber, phoneNumber)
      await super.type(selectors.inputEmailParams, email)
    }
}
