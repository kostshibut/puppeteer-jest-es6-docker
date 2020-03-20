'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  searchCity: '.search-form__input',
  selectCity: (city: string) => `[title*="${city}"]`,
}

export default class ChangeCityModal extends Modal {
  async setCity(text: string) {
    await Promise.all([
      super.type(selectors.searchCity, text),
      super.waitForResponseURLToContain('geolocationCities'),
    ])
    await super.clickWithResponse(selectors.selectCity(text), true, 'setGeolocationInfo')
  }
}
