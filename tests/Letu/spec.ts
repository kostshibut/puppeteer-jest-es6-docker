import { singlePack, test, ui } from '@actions'
import po from '@pages'
import { browser } from '@config/jest.settings'
import { CURRENT_DATE } from '@const/global/constants'

singlePack('products', () => {
  const PDP = po.productDetailsPage
  const AccountPage = po.accountPage
  const HomePage = po.homePage
  const Header = po.header

  // test 1
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

  // test 2
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

  // test 3
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

  // test 4
  test('checkItem', async () => {
    await HomePage.open()
    await Header.clickCart()
    await AccountPage.waitForSpinnerToDisappear()

    const addItemToCart = 'button[class*="btn-primary"]'
    const recommendedListItemTitle = 'a[class="products-list__item-container ddl_product_link"]>div[class="product-list__item-description"]>div[class="products-list__item-title"]'
    const itemName = await AccountPage.getText(recommendedListItemTitle)

    await AccountPage.click(addItemToCart)
    await AccountPage.waitForElement('a[class*="product-main-info-title"]')

    await AccountPage.clickWithResponse('button.btn.btn-lg.btn-primary', true, 'addItemToOrder')
    await AccountPage.waitForElement('div[class*="product-modal-title"]')

    expect((await AccountPage.getText('div[class*="product-modal-title"]')).toLowerCase()).toContain(itemName.toLowerCase())

    await AccountPage.clickPuppeteer('button[class="mfp-close"]')
    await AccountPage.clickPuppeteer('div[class="cart-item-header"] > a')
    await PDP.waitForElement('h1[class*="product-main-info-title"]')

    expect((await PDP.getText('h1[class*="product-main-info-title"]')).toLowerCase()).toContain(itemName.toLowerCase())

    await browser.close()
  })
})
