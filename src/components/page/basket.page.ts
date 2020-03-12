'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  addItemToBasket: '.btn-primary',
  productTitle: '.products-list__item-title',
  itemInOrder: '.cart-item-header',
  courierDelivery: '[for*="-courier"]',
  takeAway: '[for*="-store"]',
  courierDeliveryAvailability: '[disabled][value="courier"]',
  takeAwayAvailability: '[value="pickup"]',
  takeAwayPlace: '.products-list-table__delivery',
  checkoutButton: '.btn-primary.btn-block',
}

export default class Basket extends Rest {
  async addItemToBasketFromRecommended(position: number = 0) {
    await super.waitForSpinnerToDisappear()
    const elem = await super.getElementFromListPuppeteer(selectors.productTitle, position)
    await elem.hover()
    const label = await this._page.evaluate(el => el.innerText, elem)
    const bnt = await super.getElementFromListPuppeteer(selectors.addItemToBasket, position)
    await bnt.click()
    await super.waitForModal()
    return label
  }

  async openPDP(position: number = 0) {
    await super.clickAndGetOnPuppeteer(selectors.itemInOrder, position)
    await super.waitForSpinnerToDisappear()
  }

  async openCheckoutPage() {
    await super.clickPuppeteer(selectors.checkoutButton)
    await super.waitForSpinnerToDisappear()
  }

  async getTakeAwayPlace() {
    return super.getText(selectors.takeAwayPlace)
  }

  async waitForCourierInfo() {
    await super.waitForElement(selectors.courierDelivery)
  }

  async waitForTakeAwayInfo() {
    await super.waitForElement(selectors.takeAway)
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
