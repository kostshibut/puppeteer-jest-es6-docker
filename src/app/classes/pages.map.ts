'use strict'
import Checker from '@classes/util/checker'
import Coverage from '@classes/performance/coverage'
import Performance from '@classes/performance/performance'
import Throttling from '@classes/performance/trottling'
import Page from '@classes/util/page'
import Header from '@components/shared/header'
import HomePage from '@components/page/home.page'
import AccountPage from '@components/page/account.page'
import ProductModal from '@components/modal/product.modal'
import BasketModal from '@components/modal/basket.modal'
import ProductLandingPage from '@components/page/listing/product.landing.page'
import Basket from '@components/page/basket.page'
import ProductDetailsPage from '@components/page/product.details.page'
import Rest from '@classes/util/rest'
import CheckoutPage from '@components/page/checkout.page'
import StoreModal from '@components/modal/store.modal'
import ChangeCityModal from '@components/modal/change.city.modal'
import LoginPage from '@components/page/login.page'
import FavoriteModal from '@components/modal/favorite.modal'

interface PageParent {
  [name: string]: Page,
}

export interface PagesMap {
  basket: Basket,
  productDetailsPage: ProductDetailsPage,
  productLandingPage: ProductLandingPage,
  loginPage: LoginPage,
  productModal: ProductModal,
  basketModal: BasketModal,
  storeModal: StoreModal,
  favoriteModal: FavoriteModal,
  changeCityModal: ChangeCityModal,
  accountPage: AccountPage,
  homePage: HomePage,
  checkoutPage: CheckoutPage,
  header: Header,
  coverage: Coverage,
  performance: Performance,
  throttling: Throttling,
  checker: Checker,
  rest: Rest,
  default: Page
}

const pageObjects: PagesMap & PageParent = {
  basket: new Basket(),
  productDetailsPage: new ProductDetailsPage(),
  productLandingPage: new ProductLandingPage(),
  loginPage: new LoginPage(),
  productModal: new ProductModal(),
  basketModal: new BasketModal(),
  storeModal: new StoreModal(),
  changeCityModal: new ChangeCityModal(),
  favoriteModal: new FavoriteModal(),
  accountPage: new AccountPage(),
  homePage: new HomePage(),
  checkoutPage: new CheckoutPage(),
  header: new Header(),
  coverage: new Coverage(),
  performance: new Performance(),
  throttling: new Throttling(),
  checker: new Checker(),
  rest: new Rest(),
  default: new Page(),
}

export default pageObjects
