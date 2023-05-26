/* eslint-env browser */

// const apiLangs = [
//   'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'de', 'el',
//   'en', 'es', 'et', 'fr', 'hr', 'hu', 'id', 'it', 'is', 'kw', 'nb', 'nl',
//   'pl', 'pt', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin',
//   'zh', 'zh-tw'
// ]
// const weather = JSON.parse(window.sessionStorage.saveMeCalls) || false
// let scaleChar = weather ? weather.flags.units : ''

// NOTE: FUNCTIONAL CHECK 🆗
// BUILD REQUEST URL
export function urlBuilder (position) {
  const lang = 'en'
  const key = '767b3baa2aca876fa6ea5e4fbd75228c'
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${lat},${lon}${queries}`
  return url
}

// NOTE: FUNCTIONAL CHECK 🆗
// CALL API TO GET DATA
export function getWeatherData (url) {
  return new Promise(function promiseResponse (resolve, reject) {
    const request = new XMLHttpRequest()
    // REQUEST CALLBACKS
    request.open('GET', url)
    request.onloadstart = _ => console.log('LOAD START')
    request.onprogress = _ => console.log('*')
    request.onload = function requestOnload () {
      console.log(`${request.status}: ${request.statusText}`)
      if (request.status >= 200 && request.status < 400) {
        resolve(request.response)
      } else {
        reject(Error(request.status, request.statusText))
      }
    }
    request.onerror = _ => reject(Error('Network error on getting data.'))
    request.onloadend = _ => console.log('LOAD END')
    request.send()
  })
}

// CHECK TEMP SCALE
// function tempScaleCheck () {
//   weather.flags.units === 'us' ? scaleChar = 'F' : scaleChar = 'C'
// }
