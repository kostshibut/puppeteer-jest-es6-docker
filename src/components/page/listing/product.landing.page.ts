'use strict'
import Listing from '@components/page/listing/listing'

const xpaths = {
  productItem: '(//a[contains(@class,"products-list__item-container")])',
}

const selectors = {
  productItem: 'a[class*="products-list__item-container"]',
}

export default class ProductLandingPage extends Listing {
  static getSelectors = () => selectors

  async clickProduct(position: number = 1) {
    await super.waitForElement(selectors.productItem)
    await super.clickPuppeteer(xpaths.productItem + `[${position}]`)
    await super.waitForSpinnerToDisappear()
  }
}
