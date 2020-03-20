import { singlePack, test } from '@actions'
import po from '@pages'
import openLetuHomepage from '@precondition/open.page'
// 1. Зайти на главную страницу
// 2. Нажать войти
// 3. Авторизоваться под любым аккаунтом
// 4. Зайти в профиль
// 5. Вылогиниться
// 6. Проверить, что теперь в хедере "Войти"
singlePack('products', () => {
  const Header = po.header
  const LoginPage = po.loginPage

  openLetuHomepage(po)

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
