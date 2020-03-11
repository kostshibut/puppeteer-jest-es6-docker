import { singlePack, test, ui } from '@actions'
import po from '@pages'

singlePack('products', () => {
  const PDP = po.productDetailsPage
  const PLP = po.productLandingPage
  const AccountPage = po.accountPage
  const HomePage = po.homePage
  const Header = po.header
  const Checkout = po.checkoutPage
  const Basket = po.basket
  const ProductModal = po.productModal
  const BasketModal = po.basketModal
  const StoreModal = po.storeModal

  test('searchAndCheckTakeAwayDelivery', async () => {
    await HomePage.open()
    await HomePage.closeGuessCityPopup()
    await Header.searchFor('коробка')

    await PLP.clickProduct()
    await PDP.changeStore()
    const storeAddress = await StoreModal.getStoreName()
    await StoreModal.changeStore()
    // await PDP.waitForElement('div[class="product-delivery-info"]')

    expect((await PDP.getStoreTitle()).toLowerCase()).toContain(storeAddress.toLowerCase())
    await Header.changeCity('Урай')

    // await PDP.waitForSpinnerToDisappear()
    expect(await PDP.getStoreTitle()).toEqual('')
    await PDP.clickWithResponse('button[class*="btn-lg btn-primary"]', true)
    await PDP.clickWithResponse('a[href="cart"]', true)
    await AccountPage.waitForElement('label[for*="-courier"]')
    expect((await PDP.getText('div[class="products-list-table__delivery"]')).toLowerCase()).not.toContain(storeAddress.toLowerCase())
    expect((await PDP.getText('div[class="products-list-table__delivery"]')).toLowerCase()).toContain('недоступна')

    await Header.changeCity('Москва')

    await AccountPage.waitForElement('label[for*="-store"]')
    expect((await PDP.getText('div[class="products-list-table__delivery"]')).toLowerCase()).toContain(storeAddress.toLowerCase())
    await AccountPage.clickWithResponse('button[class="btn btn-primary btn-lg btn-block"]')

    await AccountPage.waitForSpinnerToDisappear()
    await AccountPage.waitForElement('button[disabled]')
    const isDisabled = await AccountPage._page.$('button[disabled][class*="checkout__final-action-btn"]') !== null
    expect(isDisabled).toEqual(true)

    await Checkout.fillCheckoutTakeAwayData('имя', 'фамилия', '+7 (111) 111-11-11', 'k@email.ru')
    await Checkout.clickPuppeteer('label[for*="-paytype"]')
    await Checkout.waitForSpinnerToDisappear()

    const isEnabled = await AccountPage._page.$('button[disabled][class*="checkout__final-action-btn"]') == null
    expect(isEnabled).toEqual(true)
  })
})
