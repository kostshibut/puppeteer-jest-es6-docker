import { singlePack, test } from '@actions'
import po from '@pages'
import openLetuHomepage from '@precondition/open.page'

// 1. Зайти на главную страницу
// 2. Нажать на корзину
// 3. Проверить наличие сообщения о пустой корзине
singlePack('products', () => {
  const Header = po.header
  const Basket = po.basket

  openLetuHomepage(po)

  test('openBasket', async () => Header.openBasket())
  test('checkEmptyBasket', async () => {
    const emptyCart = await Basket.getText('.mb15')
    expect(emptyCart).toContain('Ваша корзина пуста')
  })
})
