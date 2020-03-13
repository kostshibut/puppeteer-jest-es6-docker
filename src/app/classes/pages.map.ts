'use strict'
import Checker from '@classes/util/checker'
import Coverage from '@classes/performance/coverage'
import Performance from '@classes/performance/performance'
import Throttling from '@classes/performance/trottling'
import Page from '@classes/util/page'
import Header from '@components/shared/header'
import Footer from '@components/shared/footer'
import HomePage from '@components/page/home.page'
import ResetPasswordPage from '@components/page/reset.password.page'
import AccountPage from '@components/page/account.page'
import LoginModal from '@components/modal/login.modal'
import ProductModal from '@components/modal/product.modal'
import BasketModal from '@components/modal/basket.modal'
import Alert from '@components/message/alert.message'
import PersonalManagerModal
  from '@components/modal/common/personal.manager.modal'
import BaseModal from '@components/modal/common/base.modal'
import ProductLandingPage from '@components/page/listing/product.landing.page'
import Basket from '@components/page/basket.page'
import ProductDetailsPage from '@components/page/product.details.page'
import SearchPage from '@components/page/listing/search.page'
import SearchModal from '@components/modal/search.modal'
import Breadcrumbs from '@components/shared/breadcrumbs'
import ToastModal from '@components/modal/toast.modal'
import OrderRepository from '@components/atg/dynadmin/repository/order'
import GoogleEmail from '@components/shared/email'
import ProfileAdapterRepository
  from '@components/atg/dynadmin/repository/profile.adaptory'
import Rest from '@classes/util/rest'
import CheckoutPage from '@components/page/checkout.page'
import StoreModal from '@components/modal/store.modal'
import ChangeCityModal from '@components/modal/change.city.modal'
import FavoriteModal from '@components/modal/favorite.modal'
import LoginPage from '@components/page/login.page'

interface PageParent {
  [name: string]: Page,
}

export interface PagesMap {
  googleEmail: GoogleEmail,
  toastModal: ToastModal,
  basket: Basket,
  searchPage: SearchPage,
  searchModal: SearchModal,
  productDetailsPage: ProductDetailsPage,
  productLandingPage: ProductLandingPage,
  loginModal: LoginModal,
  loginPage: LoginPage,
  productModal: ProductModal,
  basketModal: BasketModal,
  storeModal: StoreModal,
  favoriteModal: FavoriteModal,
  changeCityModal: ChangeCityModal,
  personalManagerModal: PersonalManagerModal,
  accountPage: AccountPage,
  homePage: HomePage,
  checkoutPage: CheckoutPage,
  resetPasswordPage: ResetPasswordPage,
  footer: Footer,
  header: Header,
  profileAdapterRepository: ProfileAdapterRepository,
  orderRepository: OrderRepository,
  coverage: Coverage,
  performance: Performance,
  throttling: Throttling,
  baseModal: BaseModal,
  checker: Checker,
  alert: Alert,
  breadcrumbs: Breadcrumbs,
  rest: Rest,
  default: Page
}

const pageObjects: PagesMap & PageParent = {
  googleEmail: new GoogleEmail(),
  toastModal: new ToastModal(),
  basket: new Basket(),
  searchPage: new SearchPage(),
  searchModal: new SearchModal(),
  productDetailsPage: new ProductDetailsPage(),
  productLandingPage: new ProductLandingPage(),
  loginModal: new LoginModal(),
  loginPage: new LoginPage(),
  productModal: new ProductModal(),
  basketModal: new BasketModal(),
  storeModal: new StoreModal(),
  favoriteModal: new FavoriteModal(),
  changeCityModal: new ChangeCityModal(),
  personalManagerModal: new PersonalManagerModal(),
  accountPage: new AccountPage(),
  homePage: new HomePage(),
  checkoutPage: new CheckoutPage(),
  resetPasswordPage: new ResetPasswordPage(),
  footer: new Footer(),
  header: new Header(),
  profileAdapterRepository: new ProfileAdapterRepository(),
  orderRepository: new OrderRepository(),
  coverage: new Coverage(),
  performance: new Performance(),
  throttling: new Throttling(),
  baseModal: new BaseModal(),
  checker: new Checker(),
  alert: new Alert(),
  breadcrumbs: new Breadcrumbs(),
  rest: new Rest(),
  default: new Page(),
}

export default pageObjects
