'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  setStore: '.btn-rd-block',
  storeName: '[itemprop="streetAddress"]',
}

export default class StoreModal extends Modal {
    static getSelectors = () => selectors

    async changeStore(position: number = 0) {
      const store = await super.getElementFromListPuppeteer(selectors.storeName, position)
      const storeName = await this._page.evaluate(el => el.innerText, store)
      await super.clickAndGetOnPuppeteer(selectors.setStore, position)
      await super.waitForModalClose()
      return storeName.trimEnd()
    }
}
