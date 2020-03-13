'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  addItemToBasket: '[data-bind*="add-to-cart"]',
  addItemToWishList: '[data-bind*="addToWishlist"]',
}

export default class ProductModal extends Modal {
    static getSelectors = () => selectors

    async addItemToBasket() {
      await super.clickPuppeteer(selectors.addItemToBasket)
      await super.waitElementAbsence(selectors.addItemToBasket)
    }

    async addItemToFavorite() {
      await super.clickPuppeteer(selectors.addItemToWishList)
      await super.waitElementAbsence(selectors.addItemToWishList)
    }
}
