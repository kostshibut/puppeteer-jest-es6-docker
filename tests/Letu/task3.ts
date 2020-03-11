import { singlePack, test } from '@actions'
import po from '@pages'
import { browser } from '@config/jest.settings'

singlePack('products', () => {
  test('testLoginAndLogout', async () => {
    const LetuPage = po.rest
    const path = 'https://www.letu.ru'
    await LetuPage.open(path, true, { waitUntil: 'networkidle2' })
    await LetuPage.clickPuppeteer('button[class*="guess-city-popup-close"]')
    await LetuPage.clickPuppeteer('a[href="/login"]')
    await LetuPage.waitForSpinnerToDisappear()
    await LetuPage.type('input[class="form-control text-input login-input"]', 'k.shibut98@mail.ru')
    await LetuPage.type('input[type="password"]', '0987654321')
    await LetuPage.clickWithResponse('button[class="btn btn-primary btn-block"]', true, 'login')
    await LetuPage.waitForSpinnerToDisappear()
    await LetuPage.clickPuppeteer('a[class*="header-dropdown-link"][href="/account/orders"]')
    await LetuPage.clickWithResponse('a[class*="header-dropdown-link"][href="/account/profile"]')
    await LetuPage.waitForSpinnerToDisappear()
    await LetuPage.clickPuppeteer('a[class*="header-dropdown-link"][href="/account/orders"]')
    await LetuPage.clickPuppeteer('a[class*="header-dropdown-link"][href="#"]')
    await LetuPage.waitForSpinnerToDisappear()
    const loginText = await LetuPage.getText('div[class="user-menu_login-link"] > span')
    expect(loginText).toContain('Войти')
    await browser.close()
  })
})
