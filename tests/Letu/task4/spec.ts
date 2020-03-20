import { singlePack, test } from '@actions'
import po from '@pages'
import openLetuHomepage from '@precondition/open.page'
// 1. Зайти на главную страницу
// 2. Нажать на корзину
// 3. Добавить в корзину первый продукт из блока "рекомендации для вас"
// 4. Проверить, что нужный айтем добавлен
// 5. Перейти на его ПДП
// 6. Убедиться, что это тот же айтем
singlePack('products', () => {
  const PDP = po.productDetailsPage
  const Header = po.header
  const Basket = po.basket
  const ProductModal = po.productModal
  const BasketModal = po.basketModal
  let itemName: string

  openLetuHomepage(po)
  test('openBasket', async () => Header.openBasket())
  test('addItemToBasket', async () => {
    itemName = await Basket.addToBasket()
    await ProductModal.addItemToBasket()
    if (itemName) {
      expect((await BasketModal.getProductTitle()).toLowerCase())
        .toContain(itemName.toLowerCase())
    }
    await BasketModal.closeModal()
  })
  test('openItemPdp', async () => {
    await Basket.openPdpFromBasket()
    if (itemName) {
      expect((await PDP.getProductTitle()).toLowerCase())
        .toContain(itemName.toLowerCase())
    } else {
      throw new Error('itemName is Empty')
    }
  })
})
