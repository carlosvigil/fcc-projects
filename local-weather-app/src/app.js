/* eslint-env browser */
import { getWeatherData, urlBuilder, dummyData } from './api.js'
import { checkNavigator, writeToDoc } from './browser.js'

window.addEventListener('load', async function loaded () {
  console.log('DOCUMENT IS READY')
  let weather = window.sessionStorage.saveMeCalls || false

  if (!weather) {
    try {
      window.sessionStorage.saveMeCalls = await checkNavigator()
          .then(pos => getWeatherData(urlBuilder(pos)))
      weather = JSON.parse(window.sessionStorage.saveMeCalls)
    } catch (error) {
      console.log(error)
      weather = dummyData
    }
    writeToDoc(weather)
  } else writeToDoc(JSON.parse(weather))
})

// TODO: if no Nav rej Promise.all and use dummy data
