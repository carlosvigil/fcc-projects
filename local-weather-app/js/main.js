/* eslint-env browser */
// TODO: add session storage comparison
// TODO: add timezone offset to written time
// TODO: add toggle switch for temperature scale
// TODO: check if response has error obj; need to specify what errors occured

// import * as api from 'api'

// VARIABLES
const select = element => document.querySelector(element)
const geoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 900000
}

let lang = window.navigator.language.toLowerCase()

const tempObj = {
  latitude: 41.15787,
  longitude: -4.1899,
  timezone: 'Europe/Madrid',
  offset: 2,
  currently: {
    time: 1495763125,
    summary: 'Drizzle',
    icon: 'rain',
    precipType: 'rain',
    temperature: 13.89,
    apparentTemperature: 13.89
  },
  flags: { units: 'si' }
}
let stored = window.sessionStorage['saveMeCalls']
let weather = stored || tempObj
let scaleChar = stored ? weather.flags.units : ''

// IS PREFERRED LANGUAGE AVAILABLE ?
async function checkLanguage () {
  lang ? binarySearch(apiLangs, lang) : lang = 'en'
}

// SEARCH ALGO TODO: SPLIT INTO TWO SEARCHES
function binarySearch () {
  let startIndex = 0
  let stopIndex = apiLangs.length - 1
  let mid = Math.floor((stopIndex + startIndex) / 2)
  let isLang = apiLangs[mid].indexOf(lang) !== -1
  let containsLang = lang.indexOf(apiLangs[mid]) !== -1

  console.log('Starting binarySearch')
  console.log(`Nav lang is: ${lang}, apiLangs middle value is: ${apiLangs[mid]}`)
  // ((lang.indexOf(apiLangs[mid]) === -1 && start < stop) || (apiLangs.indexOf(lang) === -1 && start < stop)) {
  while ((!isLang && !containsLang) && startIndex < stopIndex) {
    // re-center
    if (lang < apiLangs[mid]) {
      stopIndex = mid - 1
    } else if (lang > apiLangs[mid]) {
      startIndex = mid + 1
    }
    mid = Math.floor((stopIndex + startIndex) / 2)
    isLang = apiLangs.indexOf(lang) !== -1
    containsLang = lang.indexOf(apiLangs[mid]) !== -1
    console.log(`apiLangs middle value is: ${apiLangs[mid]}`)
  }
  console.log(`apiLangs middle value is: ${apiLangs[mid]}`)

  if (isLang) {
    console.log('Language is available.')
  } else if (containsLang) {
    lang = apiLangs[mid]
    console.log(`Preferred localization unavailable, setting to default: ${lang}.`)
  } else {
    lang = 'en'
    console.log('Preferred language unavailable, setting to English.')
  }
  // lang.indexOf(apiLangs[mid]) !== -1 ? lang = apiLangs[mid] : lang = 'en'
  return console.log(`Lang sent to API is: ${lang}`)
} // TODO: FINISH BINARY SEARCH

// GEOLOCATION AVAILABLE ?
function checkNavigator () {
  if (window.navigator.geolocation) {
    // yup, get location
    window.navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions)
  } else {
    // nope
    window.alert('Geolocation unavailable.')
  }
}

// GEOLOCATION FAILURE CALLBACK
function geoFailure (error) {
  console.log(`ERROR: ${error.message}; CODE: ${error.code}.`)
}

// GEOLOCATION SUCCESS CALLBACK
function geoSuccess (position) {
  const time = new Date(position.timestamp).toUTCString()
  const url = urlBuilder(position)

  // console report
  console.log(`GEOLOCATION AVAILABLE
    Latest: ${time}
    Latitude: ${url.lat}
    Longitude: ${url.lon}`)
  // GET DATA
  request.open('GET', url.url)
  request.send()
}

// WRITE TO THE DOC
function writeToDoc () {
  const location = `${weather.latitude}, ${weather.longitude}`
  const current = weather.currently
  const time = new Date(current.time * 1e3)
  const isoTime = time.toISOString()
  const utcTime = time.toUTCString()
  // set scaleChar
  tempScaleCheck()
  // TODO: ADD IF ICON DEFINED FUNCTION + DEFAULT VALUE
  // select('.icon').setAttribute('id', iconStr)

  select('.location').innerHTML = location
  select('.summary').innerHTML = current.summary
  select('.temp').innerHTML = `${current.temperature}&#176;${scaleChar}`
  select('time').setAttribute('datetime', isoTime)
  select('time').innerHTML = utcTime
}

// CHECK TEMP SCALE
function tempScaleCheck () {
  weather.flags.units === 'us' ? scaleChar = 'F' : scaleChar = 'C'
}

// export { weather, stored, lang, checkLanguage, checkNavigator, writeToDoc }
