import { singlePack, test } from '@actions'
import po from '@pages'
// 1. Зайти на главную страницу
// 2. Нажать на корзину
// 3. Добавить в корзину первый продукт из блока "рекомендации для вас"
// 4. Проверить, что нужный айтем добавлен
// 5. Перейти на его ПДП
// 6. Убедиться, что это тот же айтем
singlePack('products', () => {
  const PDP = po.productDetailsPage
  const HomePage = po.homePage
  const Header = po.header
  const Basket = po.basket
  const ProductModal = po.productModal
  const BasketModal = po.basketModal
  let itemName: string

  test('openStore', async () => {
    await HomePage.open()
    await HomePage.closeGuessCityPopup()
  })
  test('openBasket', async () => Header.openBasket())
  test('addItemToBasket', async () => {
    itemName = await Basket.addToBasket(2)
    await ProductModal.addItemToBasket()
    expect((await BasketModal.getProductTitle()).toLowerCase())
      .toContain(itemName.toLowerCase())
    await BasketModal.closeModal()
  })
  test('openItemPdp', async () => {
    await Basket.openPdpFromBasket()
    expect((await PDP.getProductTitle()).toLowerCase())
      .toContain(itemName.toLowerCase())
  })
})
