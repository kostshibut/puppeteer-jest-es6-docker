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
      await super.waitAddItemToOrderResponse()
    }

    async addItemToFavorite() {
      await super.clickPuppeteer(selectors.addItemToWishList)
      await super.waitAddProductToWishListResponse()
    }
}
