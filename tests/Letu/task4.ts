import { singlePack, test } from '@actions'
import po from '@pages'

singlePack('products', () => {
  const PDP = po.productDetailsPage
  const HomePage = po.homePage
  const Header = po.header
  const Basket = po.basket
  const ProductModal = po.productModal
  const BasketModal = po.basketModal

  test('checkItem', async () => {
    await HomePage.open()
    await HomePage.closeGuessCityPopup()
    await Header.clickCart()

    await Basket.waitForSpinnerToDisappear()
    const itemName = await Basket.addItemToBasketFromRecommended(2)

    await ProductModal.addItemToBasket()

    expect((await BasketModal.getProductTitle()).toLowerCase()).toContain(itemName.toLowerCase())
    await BasketModal.closeModal()

    await Basket.openPDP()

    expect((await PDP.getProductTitle()).toLowerCase()).toContain(itemName.toLowerCase())
  })
})
