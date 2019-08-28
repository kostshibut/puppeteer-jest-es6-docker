'use strict'
import {
  API_LAUNCH,
  API_TEST,
  checkFlag,
  PERF_LAUNCH,
  PERF_TEST,
  REST_LAUNCH,
  REST_TEST,
  SOAP_LAUNCH,
  SOAP_TEST,
  SPEC_LAUNCH,
  SPEC_TEST,
  TEST_LAUNCH,
  UI_LAUNCH,
  UI_TEST,
} from '@const/properties/init.values'
import { defaultViewport } from '@config/puppet.settings'
import { browser } from '@config/jest.settings'
import devices from '@config/devices/device.settings'
import pageObjects from '@pages'
import path from 'path'
import {
  getPerformance,
  PerformanceCondition,
  performanceCondition,
  PerformanceResults,
} from '@app/performance/lighthouse.generator'
import {
  defaultPerfPackOptions,
  performancePackTestsTemplate,
  PerformanceSetup,
  PerfPackOptions,
} from '@app/performance/template'
import { writePerformance } from '@app/util/writer'
import { getInstance, getResponseTag } from '@soap'
import { SOAP } from '@const/properties/constants'
import { Page as PuppeteerPage } from 'puppeteer'
import {
  defaultImagesWaitTimer,
  defaultPerformanceWaitTimer,
  defaultTimeout,
} from '@const/global/timers'
import { startErrorMessage } from '@const/global/error.messages'
import { CHECK } from '@const/global/flags'
import { isMobileDevice } from '@precondition/open.homepage'

const stackTrace = require('stack-trace')

let puppeteerPage: PuppeteerPage
let count: number

const updatePageObjects = (page: PuppeteerPage) => {
  Object.keys(pageObjects).map(po => pageObjects[po].setPage(page))
}

const setDevice = async (name: string) => {
  const deviceObject = devices.find(e => e.name === name)
  if (deviceObject !== undefined) await puppeteerPage.emulate(deviceObject)
}

const getFilePrefix = () => {
  const getCallerFile = () => {
    let callerFile
    const rootFile = 'index.js'

    const trace = stackTrace.get()
    const currentFile = trace[0].getFileName()
    for (let i = 1; i < trace.length; i++) {
      callerFile = trace[i].getFileName()
      if (currentFile !== callerFile && !callerFile.includes(rootFile)) {
        break
      }
    }

    return callerFile
  }

  const getFilePrefixLowerCase = () => {
    const fileName = path.basename(getCallerFile())
    const arr = fileName.split('.')
    if (arr.length > 1) {
      return arr[arr.length - 2]
    } else {
      throw new Error('Error! Invalid file name pattern.')
    }
  }

  return getFilePrefixLowerCase().toUpperCase()
}

const prefix = getFilePrefix()

const propsForUI = () => Object.freeze(devices.map(e => [e.name]))

const describePropsString = () => {
  switch (prefix) {
    case SPEC_TEST:
    case UI_TEST:
      return propsForUI()
    case REST_TEST:
    case SOAP_TEST:
    case API_TEST:
    default:
      throw new Error('Error! Multi pack is currently for UI only.')
  }
}

const setPackNameForSingle = (name: string, prefix: string) => {
  switch (prefix) {
    case PERF_TEST:
      return `Performance Tests.${name}`
    case API_TEST:
    case REST_TEST:
    case SOAP_TEST:
      return `API Tests.${name}`
    case SPEC_TEST:
    case UI_TEST:
      return `Functional Tests.${name}`
    default:
      throw new Error(`Error! Invalid file prefix: "${prefix}".`)
  }
}

const newPageWithNewContext = async (browser: any) => {
  const { browserContextId } = await browser._connection.send('Target.createBrowserContext')
  puppeteerPage = await browser._createPageInContext(browserContextId)
  // @ts-ignore
  puppeteerPage.browserContextId = browserContextId
  await puppeteerPage.emulateMedia('screen')
}

async function closePage(browser: any, page: any) {
  if (page.browserContextId !== undefined) {
    await browser._connection.send('Target.disposeBrowserContext', { browserContextId: page.browserContextId })
  } else {
    await page.close()
  }
}

/*
 * Should be used when flow should be executed multiple times with several
 * different inputs.
 * For example, for UI tests list of devices is passed here by default
 * and the same tests are run for each of specified devices.
 * Not applicable for performance tests. Use performancePack or singlePack
 * instead.
 */
export const multiPack = (name: string, fn: () => void,
        data = describePropsString()) => {
  switch (CHECK) {
    case PERF_LAUNCH:
    case API_LAUNCH:
    case REST_LAUNCH:
    case SOAP_LAUNCH:
    case SPEC_LAUNCH:
    case UI_LAUNCH:
    case TEST_LAUNCH:
      describe.each(data)('%s', entity => {
        switch (prefix) {
          case SPEC_TEST:
          case UI_TEST:
            beforeAll(async () => {
              await newPageWithNewContext(browser)
              await setDevice(entity)
              updatePageObjects(puppeteerPage)
            })
            afterAll(async () => {
              await closePage(browser, puppeteerPage)
            })
            break
          case PERF_TEST:
            throw new Error('multiPack can\'t be user for Performance. Use performancePack or singlePack instead.')
          case API_TEST:
          default:
            break
        }
        count = 0
        describe(name, fn)
      })
      break
    default:
      throw new Error(
        startErrorMessage(checkFlag.name, CHECK, checkFlag.values))
  }
}

/*
 * Should be used when only one pack is run in flow.
 *
 * For performance tests fn is an object or string URL.
 * If string URL is passed default performance condition is chosen.
 * Used to simulate 1 specific performance condition.
 */
export const singlePack = (name: string,
        fn: Function | string | PerformanceCondition) => {
  switch (CHECK) {
    case PERF_LAUNCH:
    case API_LAUNCH:
    case REST_LAUNCH:
    case SOAP_LAUNCH:
    case SPEC_LAUNCH:
    case UI_LAUNCH:
    case TEST_LAUNCH: {
      describe(setPackNameForSingle(name, prefix), () => {
        switch (prefix) {
          case UI_TEST:
            beforeAll(async () => {
              puppeteerPage = await browser.newPage()
              await puppeteerPage.setViewport(defaultViewport)
              updatePageObjects(puppeteerPage)
            })
            afterAll(async () => {
              await puppeteerPage.close()
            })
            break
          case PERF_TEST:
            if (typeof fn !== 'function') {
              let setup
              if (typeof fn === 'string') {
                setup = performanceCondition(fn)
              } else {
                setup = performanceCondition(
                  fn.URL,
                  fn.networkCondition,
                  fn.expectedResults,
                  fn.writeReport)
              }
              getPerformanceResults(name, setup)
            }
            break
          case SPEC_TEST:
          case API_TEST:
          case REST_TEST:
          case SOAP_TEST:
          default:
            break
        }
        if (typeof fn === 'function') {
          count = 0
          fn()
        }
      })
      break
    }
    default:
      throw new Error(
        startErrorMessage(checkFlag.name, CHECK, checkFlag.values))
  }
}

/**
 * Result of performance analyzing by lighthouse
 */
export let performance: PerformanceResults | undefined

const getPerformanceResults = (name: string, setup: PerformanceSetup) => {
  beforeAll(async () => {
    performance = await getPerformance(
      setup.URL,
      setup.options.networkCondition)
    if (setup.writeReport) {
      writePerformance(name, setup.options, performance.report)
    }
    console.log(`${name} ${setup.options.networkCondition.emulatedFormFactor} ${setup.options.networkCondition.connection} throttling-${setup.options.networkCondition.throttlingRate} performance scores: ${Object.values(performance.lhr.categories).map(c => c.score).join(', ')}`)
  }, defaultPerformanceWaitTimer)
  count = 0
  performancePackTestsTemplate(`${setup.options.networkCondition.emulatedFormFactor} ${setup.options.networkCondition.connection} throttling-${setup.options.networkCondition.throttlingRate}`, setup.options.expectedResults)
}

/*
 * Should be used for specific URL for performance test is run for default pack
 * of network and throttling conditions.
 */
export const performancePack = (name: string, URL: string,
        packOptions: PerfPackOptions[] = defaultPerfPackOptions,
        writeReport: boolean = true) => {
  if (prefix === PERF_TEST) {
    const packSetup = packOptions
      .map(option => performanceCondition(URL,
        option.networkCondition, option.expectedResults, writeReport))
    packSetup.forEach(setup => {
      describe(setPackNameForSingle(name, prefix), () => {
        getPerformanceResults(name, setup)
      })
    })
  } else {
    throw new Error('Error! "performancePack" is only for performance tests.')
  }
}

export interface ExpectSoap {
  tag: string,
  expected: string
}

export interface DataSoap {
  name: string,
  requestFile: string,
  responseMask: Function,
  expect: ExpectSoap[],
}

export const multiSoapTest = (name: string, instance: string, data: DataSoap[],
        baseURL = SOAP.baseURL,
        rejectUnauthorized = false,
        timeout = defaultTimeout) => {
  describe(setPackNameForSingle(name, prefix), () => {
    let soapRequest: Function
    beforeAll(async () => {
      soapRequest = getInstance(instance, baseURL)
    })
    data.forEach(dataEntity => {
      count = 0
      test(dataEntity.name, async () => {
        const res = await soapRequest(dataEntity.requestFile,
          dataEntity.responseMask)

        dataEntity.expect.forEach(exp => {
          expect(getResponseTag(res, exp.tag)).toContain(exp.expected)
        })
      }, timeout)
    })
  })
}

export type FunctionWithTestName = {
  (): any;
  testName?: string;
}

/*
 * Should be used to execute non-UI specific tests.
 */
export const test = (name: string, fn: FunctionWithTestName,
        timeout = defaultTimeout) => {
  fn.testName = name
  it(`${++count} ${name}`, fn, timeout)
}

/*
 * Should be used for UI tests. Works same as jest test,
 * but makes screenshot at the end of each test by default.
 * If it's needed to make screenshot of specific block,
 * at the end of the test should be returned selector.
 * No screenshot are made if returned boolean.
 * For example, if tests ends with
 *    return checker.screenshot()
 * which returns boolean, additional screenshots won't be made.
 * But recommended to use "test" if screenshot is not needed.
 */
export const ui = (name: string, fn: FunctionWithTestName,
        timeout = defaultTimeout) => {
  const screenCheck = async () => {
    const result = await fn()
    switch (typeof result) {
      case 'undefined':
        await pageObjects.checker.screenshot()
        break
      case 'string':
        await pageObjects.checker.screenshot(result)
        break
      default:
        break
    }
  }

  test(name, screenCheck, timeout)
}

/*
 * Used for verifying existence of UI elements.
 */
export const exist = (name: string,
        value: string | ((isMobileDevice: boolean) => string),
        testTimeout = defaultTimeout,
        waitTimeout = defaultImagesWaitTimer) => {
  const fn = async () => {
    value = (typeof value === 'string') ? value : value(isMobileDevice)
    const result = await pageObjects.checker.waitFor(value, waitTimeout)
    expect(result).toBeTruthy()
    return value
  }

  ui(name, fn, testTimeout)
}
