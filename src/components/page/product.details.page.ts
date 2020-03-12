'use strict'
import Rest from '@classes/util/rest'
import { defaultResponseWaitTimer } from '@const/global/timers'

const selectors = {
  productTitle: '.product-main-info-title',
  storeInfo: '.product-delivery-info',
  changeStore: '.alert-small',
  addItemToBasket: '.btn-primary',
  deliveryInfo: '.product-delivery-info',
}

export default class ProductDetailsPage extends Rest {
  static getSelectors = () => selectors

  async getProductTitle() {
    return super.getText(selectors.productTitle)
  }

  async openChangeStoreModal(timeout = defaultResponseWaitTimer) {
    await super.clickPuppeteer(selectors.changeStore)
    await super.waitForModal(timeout)
  }

  async getStoreTitle() {
    return super.getText(selectors.storeInfo)
  }

  async addItemToBasket() {
    await super.clickPuppeteer(selectors.addItemToBasket)
    await super.waitForModal()
  }

  async waitForDeliveryInfo() {
    await super.waitForElement(selectors.deliveryInfo)
  }
}
