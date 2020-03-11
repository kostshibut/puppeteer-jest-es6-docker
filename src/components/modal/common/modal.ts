'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  closeModal: '.mfp-close',
  modal: 'mfp-container',
}

export default class Modal extends Rest {
  async closeModal() {
    await super.clickPuppeteer(selectors.closeModal)
    await this.waitForModalClose()
  }

  async waitForModalClose() {
    await super.waitElementToDisappear(selectors.modal)
  }
}
