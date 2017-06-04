/* eslint-env browser */
import { getWeatherData, urlBuilder, dummyData } from './api.js'
import { checkNavigator, writeToDoc } from './browser.js'

window.addEventListener('load', async function loaded () {
  let weather = window.sessionStorage.saveMeCalls

  console.log('DOCUMENT IS READY')

  if (!weather) {
    try {
      window.sessionStorage.saveMeCalls = await checkNavigator()
          .then(pos => getWeatherData(urlBuilder(pos)))
      weather = JSON.parse(window.sessionStorage.saveMeCalls)
    } catch (error) {
      console.log(error)
      console.log('Using dummy data.')
      weather = dummyData
    }
    writeToDoc(weather)
  } else {
    console.log('Using session storage.')
    writeToDoc(JSON.parse(weather))
  }
  return console.log('DONE')
})

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
