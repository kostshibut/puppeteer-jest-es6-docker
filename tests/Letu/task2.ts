import { singlePack, test } from '@actions'
import po from '@pages'
import { browser } from '@config/jest.settings'

singlePack('products', () => {
  test('checkUpdateCartCounter', async () => {
    const LetuPage = po.rest
    const path = 'https://www.letu.ru'
    await LetuPage.open(path, true, { waitUntil: 'networkidle2' })
    const select = 'a[href="/account/wishlist"] > em'
    const cartCount = await LetuPage.getText(select)
    await LetuPage.clickPuppeteer('button[class*="guess-city-popup-close"]')
    await LetuPage.clickPuppeteer('a[href="/cart"]')
    await LetuPage.waitForSpinnerToDisappear()
    const recommendedList = 'a[class="products-list__item-container ddl_product_link"]'
    await LetuPage.clickWithResponse(recommendedList, true, 'addItem')
    await LetuPage.clickWithResponse('div[class*="btn-group-main-info"] > button[class*="btn-default"]')
    await LetuPage.clickPuppeteer('button[class="mfp-close"]')
    expect(cartCount).not.toEqual(await LetuPage.getText(select))
    await browser.close()
  })
})
