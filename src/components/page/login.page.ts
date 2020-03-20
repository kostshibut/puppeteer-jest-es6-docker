'use strict'
import Rest from '@classes/util/rest'

const selectors = {
  inputEmail: '[type="email"]',
  inputPassword: '[type="password"]',
  loginButton: '.btn-primary',
  loginCartridge: '.LETUR-Login',
}

export default class LoginPage extends Rest {
    static getSelectors = () => selectors

    async typeLoginCredentials(email: string, password: string) {
      await super.type(selectors.inputEmail, email)
      await super.type(selectors.inputPassword, password)
    }

    async login() {
      await super.hover('footer')
      await super.clickWithResponse(selectors.loginButton, true, 'login-success')
      await super.waitForResponseURLToContain('countsFromProfile')
    }
}
