'use strict'

import Rest from '@classes/util/rest'

const selectors = {
  searchInput: '[type="search"]',
  searchButton: 'form[id="search-form"]>*>button',
  cartButton: '[href="/cart"]',
  loginButton: '[href="/login"]',
  citySelector: 'span[class="link-underline"]',
  searchCity: '.search-form__input',
  guessCityPopup: '.guess-city-popup-close',
  wishListItemCount: '[id*="WishlistLink"] em',
  accountDropdown: '[data-bind*="myAccount"]',
  profile: '[class*="dropdown"][href*="profile"]',
  logout: '[data-bind*="logout"][href="#"]',
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

  async openBasket() {
    await super.clickPuppeteer(selectors.cartButton)
    await super.waitCartResponse()
    await super.waitForSpinnerToDisappear()
  }

  async openLoginPage() {
    await super.clickWithResponse(selectors.loginButton, true, 'login')
  }

  async openAccountDropdown() {
    await super.clickPuppeteer(selectors.accountDropdown)
    await super.waitElementPresence('.header-dropdown-item')
  }

  async openAccountPage() {
    await super.clickWithResponse(selectors.profile, true, 'extendedProfileInfo')
  }

  async logout() {
    await super.clickWithResponse(selectors.logout, true, 'logout-success')
  }

  async isAnonymousUser() {
    return (await super.getText('.user-menu_login-link')).includes('Войти')
  }

  async closeGuessCityPopup() {
    await super.clickPuppeteer(selectors.guessCityPopup)
    await super.waitElementAbsence(selectors.guessCityPopup)
  }

  async getWishListItemCount() {
    return parseInt(await super.getText(selectors.wishListItemCount))
  }
}
