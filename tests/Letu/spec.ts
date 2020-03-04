import { singlePack, test, ui } from '@actions'
import po from '@pages'
import { browser } from '@config/jest.settings'
import { CURRENT_DATE } from '@const/global/constants'

singlePack('products', () => {
  test('letu test', async () => {
    const LetuPage = po?.rest

    const path = 'https://www.letu.ru/product/l-etual-podarochnaya-korobka-l-etual-srednyaya/60800005/sku/75200005'
    await LetuPage.open(path, true, undefined)

    await LetuPage.clickWithResponse('.btn.btn-lg.btn-primary', true, 'addItemToOrder')
    await LetuPage.clickWithResponse('a[href="cart"]', true, 'cart')
    await LetuPage.clickWithResponse('.alert.alert-info .pseudolink', true, 'storesByCity')
    await LetuPage.clickWithResponse('.btn-rd.btn-rd-big.btn-rd-block', true, 'updateShippingDetails')
    await LetuPage.clickWithResponse('label[data-bind*="courier"', true, 'updateShippingDetails', 'orderDelivery')
    await LetuPage.clickWithResponse('.products-list-table-actions-button-block', true, 'checkout', 'checkoutDelivery')

    const selector = 'select[data-bind*="deliveryDates"]'
    await LetuPage.selectWithResponse(selector, 3, ['updateShippingDetails'])

    const delivery = await LetuPage.getText('.checkout-form-text.font-bold')
    expect(delivery).toContain('Курьерская доставка')
    const siteDates = await LetuPage.getText(selector)

    const date = new Date()
    const parsedDate = date.toLocaleDateString().split('/')
    const day = parseInt(parsedDate[1])
    const nextDay = `${(day.toString().length === 1) ? ('0' + day) : day}.${(parsedDate[0].length === 1) ? ('0' + parsedDate[0]) : parsedDate[0]}.${parsedDate[2]}`

    expect(CURRENT_DATE).toEqual(nextDay)

    expect(siteDates).toContain(CURRENT_DATE)

    await browser.close()
  })
  const AccountPage = po.accountPage
  const HomePage = po.homePage
  const Header = po.header

  // test 1
  test('checkEmptyCart', async () => {
    const LetuPage = po.rest
    const path = 'https://www.letu.ru'
    await LetuPage.open(path, true, { waitUntil: 'networkidle2' })
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
    const select = 'a[href=\'/cart\'] > em'
    const cartCount = await LetuPage.getText(select)
    await LetuPage.click('a[href="/cart"]')
    await LetuPage.waitForSpinnerToDisappear()
    const recommendedList = 'a[class=\'products-list__item-container ddl_product_link\']'
    await LetuPage.clickWithResponse(recommendedList, true, 'addItem')
    await LetuPage.clickWithResponse('button.btn.btn-lg.btn-primary', true, 'addItemToOrder')
    await LetuPage.click('button[class=\'mfp-close\']')
    expect(cartCount).not.toEqual(await LetuPage.getText(select))
    await browser.close()
  })

  // test 3
  test('testLoginAndLogout', async () => {
    const LetuPage = po.rest
    const path = 'https://www.letu.ru'
    await LetuPage.open(path, true, { waitUntil: 'networkidle2' })
    await LetuPage.click('a[href="/login"]')
    await LetuPage.waitForSpinnerToDisappear()
    await LetuPage.type('input[class=\'form-control text-input login-input\']', 'k.shibut98@mail.ru')
    await LetuPage.type('input[type=\'password\']', '0987654321')
    await LetuPage.click('button[class=\'btn btn-primary btn-block\']')
    await LetuPage.waitForSpinnerToDisappear()
    await LetuPage.click('a[class=\'header-dropdown-link\'][href=\'#\']')
    await LetuPage.waitForSpinnerToDisappear()
    const loginText = await LetuPage.getText('div[class=\'user-menu_login-link\'] > span')
    expect(loginText).toContain('Войти')
    await browser.close()
  })
})
