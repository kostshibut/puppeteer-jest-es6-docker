'use strict'
import Rest from '@classes/util/rest'
import { defaultPresenceWaitTimer } from '@const/global/timers'

const selectors = {
  closeModal: '.mfp-close',
  modal: 'mfp-container',
}

export default class Modal extends Rest {
  async closeModal() {
    await super.clickPuppeteer(selectors.closeModal)
    await this.waitForModalClose()
  }

  async waitForModalClose(timeout = defaultPresenceWaitTimer) {
    await super.waitElementToDisappear(selectors.modal, timeout)
  }
}
