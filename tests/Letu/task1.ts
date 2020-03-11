import { singlePack, test} from '@actions'
import po from '@pages'
import { browser } from '@config/jest.settings'

singlePack('products', () => {
  test('checkEmptyCart', async () => {
    const LetuPage = po.rest
    const path = 'https://www.letu.ru'
    await LetuPage.open(path, true, { waitUntil: 'networkidle2' })
    await LetuPage.clickPuppeteer('button[class*="guess-city-popup-close"]')
    await LetuPage.click('a[href="/cart"]')
    await LetuPage.waitForSpinnerToDisappear()
    const emptyCart = await LetuPage.getText('.mb15')
    expect(emptyCart).toContain('Ваша корзина пуста')
    await browser.close()
  })
})
