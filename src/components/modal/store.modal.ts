'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  setStore: '.btn-rd-block',
  storeName: '[itemprop="streetAddress"]',
}

export default class StoreModal extends Modal {
    static getSelectors = () => selectors

    async changeStore(position: number = 0) {
      const store = await super.getElementFromListPuppeteer(
        selectors.storeName, position)
      const storeName = await super.getText(store)
      await super.clickElementFromListPuppeteer(selectors.setStore, position)
      await super.waitForUpdateShippingDetailsResponse()
      await super.waitForModalClose()
      return storeName.trim()
    }
}
