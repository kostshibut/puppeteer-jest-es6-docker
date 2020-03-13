import { singlePack, test } from '@actions'
import po from '@pages'
// 1. Зайти на главную страницу
// 2. Нажать войти
// 3. Авторизоваться под любым аккаунтом
// 4. Зайти в профиль
// 5. Вылогиниться
// 6. Проверить, что теперь в хедере "Войти"
singlePack('products', () => {
  const HomePage = po.homePage
  const Header = po.header
  const LoginPage = po.loginPage

  test('openStore', async () => {
    await HomePage.setUserAgent('AutoTest')
    await HomePage.open()
    await Header.closeGuessCityPopup()
  })
  test('openLoginPage', async () => Header.openLoginPage())
  test('loginUser', async () => {
    await LoginPage.typeLoginCredentials('k.shibut98@mail.ru', '0987654321')
    await LoginPage.login()
  })
  test('openAccountPage', async () => {
    await Header.openAccountDropdown()
    await Header.openAccountPage()
  })
  test('logout', async () => {
    await Header.openAccountDropdown()
    await Header.logout()
    expect(await Header.isAnonymousUser()).toBeTruthy()
  })
})
