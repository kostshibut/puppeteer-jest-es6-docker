'use strict'
import Rest from '@classes/util/rest'

const firstCarouselItemSelector = 'div[aria-hidden="false"]'

const selectors = {
  guessCityPopup: 'button[class*="guess-city-popup-close"]',
}

export default class HomePage extends Rest {
  static getSelectors = () => selectors

  async closeGuessCityPopup() {
    await super.clickPuppeteer(selectors.guessCityPopup, 5000)
  }
  
}
