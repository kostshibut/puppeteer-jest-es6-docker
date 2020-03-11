'use strict'
import Rest from '@classes/util/rest'

const Xpaths = {
  hoverProduct: '(//a[contains(@class,"products-list__item-container")])',
  addItemToBasket: `(//button[contains(@class,"btn-primary")])`,
  productTitle: '(//div[contains(@class,"products-list__item-title")])',
  itemInOrder: '(//div[contains(@class,"cart-item-header")]/a)',
}

const selectors = {
  itemInOrder: 'div[class="cart-item-header"]',
}

export default class Basket extends Rest {
  static getSelectors = () => selectors

  static getXpaths = () => Xpaths

  async addItemToBasketFromRecommended(position: number = 1) {
    await super.hoverPuppeteer(Xpaths.hoverProduct + `[${position}]`)
    await super.clickPuppeteer(Xpaths.addItemToBasket + `[${position}]`)
  }

  async getProductTitle(position: number = 1) {
    return super.getText(Xpaths.productTitle + `[${position}]`)
  }

  async clickItemFromOrder(position: number = 1) {
    await super.waitForElement(selectors.itemInOrder)
    await super.clickPuppeteer(Xpaths.itemInOrder + `[${position}]`, 5000)
  }
}
