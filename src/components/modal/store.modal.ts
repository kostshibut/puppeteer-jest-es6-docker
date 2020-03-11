'use strict'
import Rest from '@classes/util/rest'

const xpaths = {
  storeName: '(//div/span[contains(@itemprop,"name")])',
  setStore: '(//button[contains(@class,"btn-rd-block")])',
}


const selectors = {
  storeName: 'div>span[itemprop="name"]',
}

export default class StoreModal extends Rest {
    static getSelectors = () => selectors

    async changeStore(position: number = 1) {
      await super.clickPuppeteer(xpaths.setStore + `[${position}]`)
    }

    async getStoreName(position: number = 1) {
      await super.waitForElement(selectors.storeName)
      return super.getText(xpaths.storeName + `[${position}]`)
    }
}
