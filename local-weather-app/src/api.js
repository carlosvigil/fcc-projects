/* eslint-env browser */
import setLanguage from './langSearch.js'

const apiLangs = [
  'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'de', 'el', 'en', 'es', 'et', 'fr',
  'hr', 'hu', 'id', 'it', 'is', 'kw', 'nb', 'nl', 'pl', 'pt', 'ru', 'sk', 'sl',
  'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin', 'zh', 'zh-tw'
]

const dummyData = {
  'latitude': 41.400004027224064,
  'longitude': -73.08102241601675,
  'timezone': 'America/New_York',
  'offset': -4,
  'currently': {
    'time': 1496461442,
    'summary': 'Clear',
    'icon': 'clear-night',
    'temperature': 52.26
  },
  'flags': { 'units': 'us' }
}

// FUNCTIONAL CHECK 🆗
// BUILD REQUEST URL
function urlParts (position) {
  const browserLang = window.navigator.language.toLowerCase()
  const lang = setLanguage(apiLangs, browserLang)
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  return { browserLang, lang, lat, lon }
}

function darkSkyUrlBuilder (position) {
  const browserBits = urlParts(position)
  const key = '767b3baa2aca876fa6ea5e4fbd75228c'
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${browserBits.lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${browserBits.lat},${browserBits.lon}${queries}`
  return url
}

// FUNCTIONAL CHECK 🆗
// CALL API TO GET DATA
function getWeatherData (url) {
  return new Promise(function promiseResponse (resolve, reject) {
    const request = new XMLHttpRequest()
    // REQUEST CALLBACKS
    request.open('GET', url)
    request.onloadstart = _ => console.log('LOAD START')
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
// TODO: finish reverse geocode
function googleMapsUrlBuilder (position) {
  const browserBits = urlParts(position)
  const key = ''
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${browserBits.lang}&units=auto`
  const url = `${browserBits.lat},${browserBits.lon}`
  return url
}

export { apiLangs, dummyData, darkSkyUrlBuilder, getWeatherData, googleMapsUrlBuilder }
