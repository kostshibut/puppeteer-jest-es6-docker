'use strict'

import Rest from '@classes/util/rest'

const selectors = {
  searchInput: '[type="search"]',
  searchButton: 'form[id="search-form"]>*>button',
  cartButton: 'a[href="/cart"]',
  citySelector: 'span[class="link-underline"]',
  searchCity: '.search-form__input',
}

export default class Header extends Rest {
  static getSelectors = () => selectors

  async changeCity() {
    await super.clickPuppeteer(selectors.citySelector)
  }

  async searchFor(text: string) {
    await super.type(selectors.searchInput, text)
    await super.clickPuppeteer(selectors.searchButton)
    await super.waitForResponseURLToContain('search')
    await super.waitForSpinnerToDisappear()
    await super.hover('[id=footer]')
  }

  async clickCart() {
    await super.clickPuppeteer(selectors.cartButton)
    await super.waitCartResponse()
    await super.waitForSpinnerToDisappear()
  }
}
