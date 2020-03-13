'use strict'
import { ElementHandle } from 'puppeteer'
import quantity from '@components/shared/util/quantity'
import { leadS } from '@components/shared/util/constant'
import { AddToBasketInterface } from '@interfaces'
import { defaultResponseWaitTimer, defaultWaitTimer } from '@const/global/timers'
import Rest from '@classes/util/rest'

const productsContainer = '#productItemsList'
const product = `${productsContainer} #productItem`
const addToBasketContainer = `${product} #addToBasketButton button`
const buttonDisabled = '[disabled]'
const navigationContainer = '#navigationFacets'
const navigationFacet = `${navigationContainer} .collapse-element-default`

const selectors = {
  navigation: {
    container: navigationContainer,
    clearFacets: '#clearFacetsButton',
    facet: {
      element: navigationFacet,
      title: `${navigationFacet}-header`,
      checkbox: `${navigationFacet} label`,
    },
  },
  products: {
    addToBasket: '.btn-primary',
    addToFavorite: '.btn-default',
    container: productsContainer,
    title: '.products-list__item-title',
    product: '.products-list__item',
    pdpLink: `.products-list__item-container`,
    quantity: {
      container: `${product} ${quantity.container}`,
      increase: `${product} ${quantity.increase}`,
      input: `${product} ${quantity.input}`,
      decrease: `${product} ${quantity.decrease}`,
    },
    openModal: `${product} #openModalButton`,
  },
  pagination: {
    container: '#paginationId',
    first: '#firstPagination',
    previous: '#previousPagination',
    next: '#nextPagination',
    last: '#lastPagination',
    item: '#paginationList a',
  },
  sorting: {
    container: '#sortingOption',
    option: 'option',
  },
  displayAmount: '#listingDisplayedAmountOfProducts',
  emptyResults: '#emptyResults',
  lead: leadS,
}

class Listing extends Rest implements AddToBasketInterface {
  static getListingSelectors = () => selectors

  async goToPDP(position = 0) {
    await super.clickAndGetOnPuppeteer(selectors.products.pdpLink, position)
    await super.waitForSpinnerToDisappear()
  }

  async goToPDPAndBack(position = 0, url?: string, takeScreen = true) {
    try {
      await this.goToPDP(position)
      if (takeScreen) {
        await super.screenshot()
      }
    } finally {
      await super.goBackIfNeeded(url)
    }
  }

  async addToBasket(position = 0) {
    return this.openProductModal(position, selectors.products.addToBasket)
  }

  async addToFavorite(position = 0) {
    return this.openProductModal(position, selectors.products.addToFavorite)
  }

  async hoverProduct(position = 0) {
    const elem = await super.getElementFromListPuppeteer(
      selectors.products.product, position)
    await elem.hover()
    return elem
  }

  async openModal(position = 0) {
    await super.clickOnPuppeteer(selectors.products.openModal, position)
  }

  async openProductModal(position = 0, selector : string) {
    const elem = await this.hoverProduct(position)
    const label = await super.getText(await super
      .getElementFromParentElementPuppeteer(elem, selectors.products.title))
    const btn = await super.getElementFromParentElementPuppeteer(
      elem, selector)
    await btn.click()
    await super.waitForModal()
    return label
  }

  async clickOnFacet(position: number): Promise<ElementHandle> {
    return super.clickAndGetOnPuppeteer(
      selectors.navigation.facet.title, position)
  }

  async clickOnFacetOption(facet: ElementHandle, position = 0) {
    const checkbox = await super.getElementFromParentElementPuppeteer(
      facet, selectors.navigation.facet.checkbox, position)
    await checkbox.click()
    await super.waitForSpinnerToDisappear()
  }

  async clickFacetOptionWithExpand(
          facetPosition: number,
          checkboxPosition: number) {
    const facet = await this.clickOnFacet(facetPosition)
    await this.clickOnFacetOption(facet, checkboxPosition)
  }

  async clickFacetOptionWithoutExpand(
          facetPosition: number,
          checkboxPosition: number) {
    const facet = await super.getElementFromListPuppeteer(
      selectors.navigation.facet.element, facetPosition)
    await this.clickOnFacetOption(facet, checkboxPosition)
  }

  /*
   * If @param option is number, function takes position in array.
   * If @param option is string, it's value.
   */
  async selectSortByOption(option: number | string, timeout?: number) {
    await super.selectOption(
      selectors.sorting.container,
      option,
      selectors.sorting.option,
      timeout)
    await super.waitFor(selectors.sorting.container)
    await super.waitForSpinnerToDisappear()
  }

  async clearFacets() {
    await super.clickPuppeteer(selectors.navigation.clearFacets)
  }

  async waitForListingPageElements() {
    try {
      await super.waitFor(selectors.navigation.container)
    } catch (e) {
      await super.waitFor(selectors.emptyResults)
    }
    return super.waitFor(selectors.lead)
  }

  async openNextPage() {
    const before = await super.getText(selectors.displayAmount)
    await super.click(selectors.pagination.next)
    await super.waitForSpinnerToDisappear()
    const after = await super.getText(selectors.displayAmount)
    expect(before).not.toEqual(after)
  }

  async openPreviousPage() {
    await this._pagination(selectors.pagination.previous)
  }

  async openFirstPage() {
    await this._pagination(selectors.pagination.first)
  }

  async openLastPage() {
    await this._pagination(selectors.pagination.last)
  }

  async openPaginationPage(position = 0) {
    await this._pagination(selectors.pagination.item, position)
  }

  async _pagination(selector: string, position?: number) {
    const before = await super.getText(selectors.displayAmount)
    if (position) {
      await super.clickOn(selector, position)
    } else {
      await super.click(selector)
    }
    await super.waitForSpinnerToDisappear()
    const after = await super.getText(selectors.displayAmount)
    expect(before).not.toEqual(after)
  }

  async hasProductsContainer() {
    await super.waitFor(selectors.products.container)
  }

  async hasNavigationContainer() {
    await super.waitFor(selectors.navigation.container)
  }
}

export default Listing
