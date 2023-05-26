/* eslint-env browser */
import { getWeatherData, darkSkyUrlBuilder, dummyData } from './api.js'
import { checkNavigator, writeToDoc } from './browser.js'

// Wait for everything to load, avoiding document timing issues
window.addEventListener('load', async function loaded () {
  let weather = window.sessionStorage.saveMeCalls

  // don't make unnecessary calls
  if (!weather) {
    try {
      window.sessionStorage.saveMeCalls = await checkNavigator()
          .then(pos => getWeatherData(darkSkyUrlBuilder(pos)))
      weather = JSON.parse(window.sessionStorage.saveMeCalls)
    } catch (error) {
      console.log(error)
      console.log('Using placeholder data.')
      weather = dummyData
    }
    writeToDoc(weather)
  } else {
    console.log('Using data from session storage.')
    writeToDoc(JSON.parse(weather))
  }
  return console.log('DONE')
})

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
