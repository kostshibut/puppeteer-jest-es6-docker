'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  hoverProduct: 'a[class*="products-list__item-container"]',
  addItemToBasket: 'button[class*="btn-primary"]',
  productTitle: '(//div[contains(@class,"products-list__item-title")])',
  itemInOrder: 'div[class="cart-item-header"]',
}

export default class Basket extends Rest {
  async addItemToBasketFromRecommended(position: number = 0) {
    const text = await super.getText(selectors.productTitle + `[${position + 1}]`, 10000)
    const elem = await super.getElementFromListPuppeteer(selectors.hoverProduct, position)
    await elem.hover()
    const bnt = await super.getElementFromListPuppeteer(selectors.addItemToBasket, position)
    await bnt.click()
    return text
  }

  async openPDP(position: number = 0) {
    await super.waitForElement(selectors.itemInOrder)
    await super.clickAndGetOnPuppeteer(selectors.itemInOrder, position)
  }
}
