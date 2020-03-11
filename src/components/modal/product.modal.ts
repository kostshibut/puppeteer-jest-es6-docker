'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  addItemToBasket: 'button.btn-lg.btn-primary',
}

export default class ProductModal extends Rest {
    static getSelectors = () => selectors

    async addItemToBasket() {
      await super.clickPuppeteer(selectors.addItemToBasket)
    }
}
