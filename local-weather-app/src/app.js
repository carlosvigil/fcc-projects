import { callApi, darkSkyUrlBuilder, googleMapsUrlBuilder, dummyData } from './api.js'
import { checkNavigator, writeToDoc } from './browser.js'

// Wait for everything to load, avoiding document timing issues
window.addEventListener('load', async function loaded () {
  let weather = window.sessionStorage.darkSky
  let address = window.sessionStorage.googleMaps

  // don't make unnecessary calls
  if (!weather) {
    try {
      window.sessionStorage.googleMaps = await checkNavigator()
          .then(pos => callApi(googleMapsUrlBuilder(pos), 'Google Maps'))
      window.sessionStorage.darkSky = await checkNavigator()
          .then(pos => callApi(darkSkyUrlBuilder(pos), 'Dark Sky'))
      weather = JSON.parse(window.sessionStorage.darkSky)
      address = JSON.parse(window.sessionStorage.googleMaps)
    } catch (error) {
      console.log(error)
      console.log('Using placeholder data.')
      weather = dummyData
      address = 'Seymour, CT, USA'
    }
    writeToDoc(weather)
  } else {
    console.log('Using data from session storage.')
    writeToDoc(JSON.parse(weather), JSON.parse(address))
  }
  return console.log('DONE')
})

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
