'use strict'

import Rest from '@classes/util/rest'
import { defaultWaitTimer } from '@const/global/timers'

const selectors = {
  login: '.user-menu_login-link',
  searchInput: '[type="search"]',
  searchButton: '[role*="search"] button',
  cartButton: '[href="/cart"]',
  loginButton: '[href="/login"]',
  citySelector: '.link-underline',
  searchCity: '.search-form__input',
  guessCityPopup: '.guess-city-popup-close',
  wishListItemCount: '[id*="WishlistLink"] em',
  accountDropdown: '[data-bind*="myAccount"]',
  profile: '[class*="dropdown"][href*="profile"]',
  logout: '[class*="dropdown"][href="#"]',
  searchResult: '[data-bind*= fullHref] mark',
  profileInfo: '.LETUR-ProfileInfo',
  plpResultList: '.LETUR-ResultsList',
  pdpPage: '[id*="ProductDetail"]',
  basketPage: '.LETUR-CartEditor',
  loginPage: '.LETUR-Login',
}

export default class Header extends Rest {
  static getSelectors = () => selectors

  async openChangeCityModal() {
    await super.clickPuppeteer(selectors.citySelector)
    await super.waitForModal()
  }

  async search(text: string) {
    await super.type(selectors.searchInput, text)
    await super.waitSearchResultResponse()
  }

  async goToPlpFromSearch() {
    await super.clickWithResponse(selectors.searchButton, true, 'search')
  }

  async goToPdpFromSearch(position: number = 0) {
    await super.clickElementFromListPuppeteer(selectors.searchResult, position)
    await super.waitProductPDPResponse()
  }

  async openBasket() {
    await super.clickWithResponse(selectors.cartButton, true, 'cart')
  }

  async openLoginPage() {
    await super.clickWithResponse(selectors.loginButton, true, 'login')
  }

  async openAccountDropdown() {
    // await super.waitToBeVisible(selectors.profile)
    await super.clickPuppeteer(selectors.accountDropdown)
    await super.waitToBeVisible(selectors.profile)
  }

  async openAccountPage() {
    await super.clickWithResponse(selectors.profile, true, 'extendedProfileInfo')
  }

  async logout() {
    await super.clickWithResponse(selectors.logout, true, 'logout-success')
    await super.waitElementToDisappear(selectors.accountDropdown)
  }

  async isAnonymousUser() {
    return (await super.getText(selectors.login)).includes('Войти')
  }

  async closeGuessCityPopup() {
    await super.clickPuppeteer(selectors.guessCityPopup)
    await super.waitElementToDisappear(selectors.guessCityPopup)
  }

  async getWishListItemCount() {
    return parseInt(await super.getText(selectors.wishListItemCount))
  }
}
