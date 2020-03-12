'use strict'

import Rest from '@classes/util/rest'

const selectors = {
  inputFirstName: '[name="firstName"]',
  inputLastName: '[name="lastName"]',
  inputPhoneNumber: '[name="phoneNumber"]',
  inputEmailParams: '[name="email"]',
  disabledPaymentButton: '.checkout__final-action-btn[disabled]',
  paymentByCard: '[for*="-paytype"]',
}

export default class CheckoutPage extends Rest {
    static getSelectors = () => selectors

    async fillCheckoutTakeAwayData(firstName: string, lastName: string, phoneNumber: string, email: string) {
      await super.type(selectors.inputFirstName, firstName)
      await super.type(selectors.inputLastName, lastName)
      await super.type(selectors.inputPhoneNumber, phoneNumber)
      await super.type(selectors.inputEmailParams, email)
    }

    async isProcessPaymentAvailable() {
      try {
        await super.waitForElement(selectors.disabledPaymentButton)
        return false
      } catch (e) {
        return true
      }
    }

    async setPaymentByCard() {
      await super.clickWithResponse(selectors.paymentByCard, true)
    }
}
