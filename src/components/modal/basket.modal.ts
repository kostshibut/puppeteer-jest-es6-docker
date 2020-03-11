'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  closeModal: 'button[class="mfp-close"]',
  productTitle: 'div[class*="product-modal-title"]',
}

export default class BasketModal extends Rest {
    static getSelectors = () => selectors

    async closeModal() {
      await super.clickPuppeteer(selectors.closeModal)
    }

    async getProductTitle() {
      return super.getText(selectors.productTitle)
    }
}
