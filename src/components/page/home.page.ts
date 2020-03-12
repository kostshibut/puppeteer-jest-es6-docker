'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  guessCityPopup: '.guess-city-popup-close',
}

export default class HomePage extends Rest {
  static getSelectors = () => selectors

  async closeGuessCityPopup() {
    await super.clickPuppeteer(selectors.guessCityPopup, 5000)
  }
  
}
