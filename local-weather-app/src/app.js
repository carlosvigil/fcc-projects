/* eslint-env browser */
import { getWeatherData, urlBuilder } from './api.js'
import { checkNavigator } from './browser.js'

window.addEventListener('load', async function loaded () {
  console.log('DOCUMENT IS READY')
  try {
    window.sessionStorage.saveMeCalls = await checkNavigator()
        .then(pos => urlBuilder(pos))
        .then(url => getWeatherData(url))
    // writeToDoc(window.sessionStorage.saveMeCalls)
  } catch (error) { console.log(error) }
})

// TODO: if no Nav rej Promise.all and use dummy data
