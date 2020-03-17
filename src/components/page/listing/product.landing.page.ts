'use strict'
import Listing from '@components/page/listing/listing'

const selectors = {
  productItem: '.products-list__item-container',
}

export default class ProductLandingPage extends Listing {
  static getSelectors = () => selectors

  async openProductPDP(position: number = 0) {
    await Promise.all([
      super.clickElementFromListPuppeteer(selectors.productItem, position),
      super.waitProductPDPResponse(),
      super.waitForSpinnerToDisappear(),
    ])
  }
}
