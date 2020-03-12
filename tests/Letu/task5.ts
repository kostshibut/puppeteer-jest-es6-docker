import { singlePack, test } from '@actions'
import po from '@pages'

singlePack('products', () => {
  const PDP = po.productDetailsPage
  const PLP = po.productLandingPage
  const HomePage = po.homePage
  const Header = po.header
  const Checkout = po.checkoutPage
  const Basket = po.basket
  const BasketModal = po.basketModal
  const StoreModal = po.storeModal
  const ChangeCityModal = po.changeCityModal

  test('searchAndCheckTakeAwayDelivery', async () => {
    await HomePage.setUserAgent('AutoTest')
    await HomePage.open()
    await HomePage.closeGuessCityPopup()
    await Header.searchFor('коробка')

    await PLP.openProductPDP()
    await PDP.openChangeStoreModal()
    const storeAddress = await StoreModal.changeStore()
    await PDP.waitForDeliveryInfo()

    expect((await PDP.getStoreTitle()).toLowerCase()).toContain(storeAddress.toLowerCase())
    await Header.changeCity()
    await ChangeCityModal.setCity('Урай')

    expect(await PDP.getStoreTitle()).toEqual('')
    await PDP.addItemToBasket()
    await BasketModal.checkout()
    await Basket.waitForCourierInfo()
    expect(await Basket.isTakeAwayAvailable() && await Basket.isCourierAvailable()).toEqual(false)

    await Header.changeCity()
    await ChangeCityModal.setCity('Москва')

    await Basket.waitForTakeAwayInfo()
    expect((await Basket.getTakeAwayPlace()).toLowerCase()).toContain(storeAddress.toLowerCase())
    await Basket.openCheckoutPage()

    expect(await Checkout.isProcessPaymentAvailable()).toEqual(false)

    await Checkout.fillCheckoutTakeAwayData('имя', 'фамилия', '+7 (111) 111-11-11', 'k@email.ru')
    await Checkout.setPaymentByCard()
    expect(await Checkout.isProcessPaymentAvailable()).toEqual(true)
  })
})
