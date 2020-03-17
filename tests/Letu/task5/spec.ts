import { singlePack, test } from '@actions'
import po from '@pages'
// 1. Найти "коробка" в поиске
// 2. Открыть первый результат, содержащий это слово
// 3. Выбрать первый магазин самовывоза на ПДП
// 4. Проверить, что магазин выбран
// 5. Сменить город на "Урай"
// 6. Проверить, что нет блоков самовывоза и курьерской доставки
// 7. Добавить айтем в корзину
// 8. Проверить, что нет самовывоза и курьерская доставка не доступна
// 9. Сменить город на Москву (в пределах МКАД)
// 10. Проверить, что выбран магазин самовывоза из п. 4
// 11. Перейти на чекаут
// 12. Проверить, что кнопка "Оплатить заказ" задизейблена
// 13. Заполнить все поля валидными данными
// 14. Выбрать оплату банковской картой
// 15. Проверить, что кнопка "Оплатить заказ" раздизейблена,
// но не кликать на нее
singlePack('products', () => {
  const PDP = po.productDetailsPage
  const HomePage = po.homePage
  const Header = po.header
  const Checkout = po.checkoutPage
  const Basket = po.basket
  const BasketModal = po.basketModal
  const StoreModal = po.storeModal
  const ChangeCityModal = po.changeCityModal
  let storeAddress: string

  test('openStore', async () => {
    await HomePage.open()
    await HomePage.closeGuessCityPopup()
  })
  test('searchForProduct', async () => Header.search('коробка'))
  test('openProductPdp', async () => Header.goToPdpFromSearch())
  test('changeStore', async () => {
    await PDP.openChangeStoreModal()
    storeAddress = await StoreModal.changeStore()
    await PDP.waitProductPDPResponse()
    expect((await PDP.getStoreTitle()).toLowerCase())
      .toContain(storeAddress.toLowerCase())
  })
  test('changeCityToUrai', async () => {
    await Header.changeCity()
    await ChangeCityModal.setCity('Урай')
    expect(await PDP.getStoreTitle()).toEqual('')
  })
  test('addItemToBasket', async () => PDP.addItemToBasket())
  test('openBasketPage', async () => {
    await BasketModal.checkout()
    expect(await Basket.isTakeAwayAvailable() &&
            await Basket.isCourierAvailable()).toEqual(false)
  })
  test('changeCityToMoscow', async () => {
    await Header.changeCity()
    await ChangeCityModal.setCity('Москва')
    expect((await Basket.getTakeAwayPlace()).toLowerCase())
      .toContain(storeAddress.toLowerCase())
  })
  test('openCheckoutPage', async () => {
    await Basket.openCheckoutPage()
    expect(await Checkout.isProcessPaymentAvailable()).toEqual(false)
  })
  test('fillCheckoutData', async () => {
    await Checkout.fillCheckoutTakeAwayData('имя', 'фамилия',
      '+7 (111) 111-11-11', 'k@email.ru')
    await Checkout.setPaymentByCard()
    expect(await Checkout.isProcessPaymentAvailable()).toEqual(true)
  })
})
