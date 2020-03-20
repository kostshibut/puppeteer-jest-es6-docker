'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  setStoreButton: '.btn-rd-block',
  storeItem: '.store-item',
  storeName: '[itemprop="streetAddress"]',
}

export default class StoreModal extends Modal {
    static getSelectors = () => selectors

    async changeStore(position: number = 0) {
      const store = await super.getElementFromListPuppeteer(
        selectors.storeItem, position)
      const storeName = await super.getText(await super
        .getElementFromParentElementPuppeteer(store, selectors.storeName))
      const btn = await super.getElementFromParentElementPuppeteer(
        store, selectors.setStoreButton)
      await btn.click()
      await super.waitForUpdateShippingDetailsResponse()
      await super.waitForModalClose()
      return storeName.trim()
    }
}
