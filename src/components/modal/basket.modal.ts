'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  productTitle: '.product-modal-title',
  addItemToBasket: 'a[href="cart"]',
}

export default class BasketModal extends Modal {
    static getSelectors = () => selectors

    async getProductTitle() {
      return super.getText(selectors.productTitle)
    }

    async openBasket() {
      await super.clickPuppeteer(selectors.addItemToBasket)
      await super.waitForModalClose()
      await super.waitForDeliveryInfoResponse()
    }
}
