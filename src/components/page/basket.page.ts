'use strict'
import Rest from '@classes/util/rest'
import Listing from '@components/page/listing/listing'

const selectors = {
  itemInOrder: '.cart-item-header',
  courierDelivery: '[for*="-courier"]',
  takeAway: '[for*="-store"]',
  courierDeliveryAvailability: '[disabled][value="courier"]',
  takeAwayAvailability: '[value="pickup"]',
  takeAwayPlace: '.products-list-table__delivery',
  checkoutButton: '.btn-primary.btn-block',
  pdpPage: '[id*="ProductDetail"]',
  checkoutPage: '.LETUR-Checkout',
}

export default class Basket extends Listing {
  async openPdpFromBasket(position: number = 0) {
    await super.clickElementFromListPuppeteer(selectors.itemInOrder, position)
    await super.waitForSpinnerToDisappear()
    await super.waitProductPDPResponse()
  }

  async openCheckoutPage() {
    await super.clickWithResponse(selectors.checkoutButton, true, 'checkout')
  }

  async getTakeAwayPlace() {
    return super.getText(selectors.takeAwayPlace)
  }

  async isCourierAvailable() {
    let state = true
    try {
      await super._page.$(selectors.courierDeliveryAvailability)
      state = false
      return state
    } catch (e) {
      return state
    }
  }

  async isTakeAwayAvailable() {
    let state = false
    try {
      await super._page.$(selectors.takeAwayAvailability)
      state = true
      return state
    } catch (e) {
      return state
    }
  }
}
