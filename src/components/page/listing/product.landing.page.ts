'use strict'
import Listing from '@components/page/listing/listing'

const selectors = {
  productItem: '.products-list__item-container',
}

export default class ProductLandingPage extends Listing {
  static getSelectors = () => selectors

  async openProductPDP(position: number = 0) {
    await Promise.all([
      super.clickAndGetOnPuppeteer(selectors.productItem, position),
      super.waitProductPDP(),
      super.waitForSpinnerToDisappear(),
    ])
  }
}
