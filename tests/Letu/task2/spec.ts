import { singlePack, test } from '@actions'
import po from '@pages'
import openLetuHomepage from '@precondition/open.page'
// 1. Зайти на главную страницу
// 2. Нажать на корзину
// 3. Добавить в избранное первый продукт из блока "рекомендации для вас"
// 4. Проверить, что счетчик избранного изменился
singlePack('products', () => {
  const Header = po.header
  const Basket = po.basket
  const ProductModal = po.productModal
  const FavoriteModal = po.favoriteModal

  openLetuHomepage(po)

  test('openBasket', async () => Header.openBasket())
  test('addToFavorite', async () => {
    let item = await Header.getWishListItemCount()
    await Basket.addToFavorite()
    await ProductModal.addItemToFavorite()
    await FavoriteModal.closeModal()
    expect(await Header.getWishListItemCount()).toEqual(++item)
  })
})
