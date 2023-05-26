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
function urlParts (position) {
  const lang = window.navigator.language.toLowerCase()
  const loc = `${position.coords.latitude},${position.coords.longitude}`
  return { lang, loc }
}

// FUNCTIONAL CHECK 🆗
function darkSkyUrlBuilder (position) {
  const browserBits = urlParts(position)
  const lang = setLanguage(apiLangs, browserBits.lang)
  const key = '767b3baa2aca876fa6ea5e4fbd75228c'
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${browserBits.loc}${queries}`
  return url
}

// FUNCTIONAL CHECK 🆗
function googleMapsUrlBuilder (position) {
  const browserBits = urlParts(position)
  // const key = ''
  const googleMaps = 'https://maps.googleapis.com/maps/api/geocode/json'
  const parameters = `?latlng=${browserBits.loc}&language=${browserBits.browserLang}`
  const url = `${googleMaps}${parameters}`
  return url
}

// FUNCTIONAL CHECK 🆗
// CALL API TO GET DATA
function callApi (url, service) {
  return new Promise(function promiseResponse (resolve, reject) {
    const request = new XMLHttpRequest()
    // REQUEST CALLBACKS
    request.open('GET', url)
    request.onloadstart = _ => console.log(`${service}: LOAD START`)
    request.onload = function requestOnload () {
      console.log(`${service}: ${request.status}, ${request.statusText}`)
      if (request.status >= 200 && request.status < 400) {
        resolve(request.response)
      } else {
        reject(Error(request.status, request.statusText))
      }
    }
    request.onerror = _ => reject(Error(`${service}: Network error on getting data.`))
    request.onloadend = _ => console.log(`${service}: LOAD END`)
    request.send()
  })
}

export { apiLangs, dummyData, darkSkyUrlBuilder, googleMapsUrlBuilder, callApi }
