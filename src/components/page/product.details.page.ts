'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  productTitle: 'h1[class*="product-main-info-title"]',
  storeInfo: 'div[class="product-delivery-info"]>ul',
  changeStore: 'div[class*="alert-small"]',
}

export default class ProductDetailsPage extends Rest {
  static getSelectors = () => selectors

  async getProductTitle() {
    return super.getText(selectors.productTitle)
  }

  async changeStore() {
    await super.clickPuppeteer(selectors.changeStore)
  }

  async getStoreTitle() {
    return super.getText(selectors.storeInfo)
  }
}
