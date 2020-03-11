'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  productTitle: 'div[class*="product-modal-title"]',
}

export default class BasketModal extends Modal {
    static getSelectors = () => selectors

    async getProductTitle() {
      return super.getText(selectors.productTitle)
    }
}
