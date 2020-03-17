'use strict'
import Modal from '@components/modal/common/modal'

const selectors = {
  searchCity: '.search-form__input',
}

export default class ChangeCityModal extends Modal {
  async setCity(text: string) {
    await Promise.all([
      super.type(selectors.searchCity, text),
      super.waitForTextToBe(text, '.city-item'),
      super.waitForResponseURLToContain('geolocationCities'),
    ])
    await super.clickWithResponse('.city-item', true, 'setGeolocationInfo')
  }
}
