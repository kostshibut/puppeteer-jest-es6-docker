'use strict'

import Rest from '@classes/util/rest'

const selectors = {
  searchInput: 'input[class*="search-form__input"][type="search"]',
  searchButton: 'form[id="search-form"]>div>button[class*="search-form__submit"]',
  cartButton: 'a[href="/cart"]',
  citySelector: 'span[class="link-underline"]',
  searchCity: 'form>div>input[class*="search-form__input"]',
}

export default class Header extends Rest {
  static getSelectors = () => selectors

  async changeCity(text: string) {
    await super.clickPuppeteer(selectors.citySelector)
    await super.waitForElement('div[class="mfp-content"]>div[class="letu-modal"]>div[class="letu-modal-title"]')
    await super.type(selectors.searchCity, text)
    await super.waitForTextToBe(text, 'ul[class="list-group city-selector"]>li[class*="city-item"')
    await super.clickPuppeteer('ul[class="list-group city-selector"]>li[class*="city-item"')
    await super.waitForSpinnerToDisappear()
  }

  async searchFor(text: string) {
    await super.type(selectors.searchInput, text)
    await super.clickPuppeteer(selectors.searchButton)
  }

  async clickCart() {
    await super.clickPuppeteer(selectors.cartButton)
    await super.waitCartResponse()
  }
}
