'use strict'
import { PagesMap } from '@classes/pages.map'
import { test } from '@actions'

export const openLetuHomepageExecute = async (pages: PagesMap) => {
  const Header = pages.header
  const HomePage = pages.homePage

  await HomePage.setUserAgent('AutoTest')
  await HomePage.open()
  await Header.closeGuessCityPopup()
}

const openLetuHomepage = (pages: PagesMap, name: string = 'open letu.ru') => {
  test(name, async () => {
    await openLetuHomepageExecute(pages)
  })
}

export default openLetuHomepage
