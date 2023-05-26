'use strict'
/* eslint-env browser */
// TODO: add session storage comparison
// TODO: add timezone offset to written time
// TODO: add toggle switch for temperature scale

// VARIABLES
const select = element => document.querySelector(element)
const geoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 900000
}
const key = '129f708692983c0e4c3192f214aaf598'
const request = new XMLHttpRequest()
const apiLangs = [
  'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'de', 'el',
  'en', 'es', 'et', 'fr', 'hr', 'hu', 'id', 'it', 'is', 'kw', 'nb', 'nl',
  'pl', 'pt', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin',
  'zh', 'zh-tw'
]
let lang = window.navigator.language
let scaleChar = ''
let stored = window.sessionStorage['saveMeCalls']
// WEATHER OBJ REFERENCE
let weather = {
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

// IS DOC READY ?
;(function main (start) {
  if (document.readyState === 'complete') {
    console.log('DOCUMENT IS READY')
    start()
  } else {
    console.log('NOT READY, LISTENER ADDED')
    window.addEventListener('load', _ => start())
  }
}(start))

// GOOOOOO!!!!
function start () {
  console.log('START')
  if (stored) {
    console.log('Saving calls by using stored data.')
    weather = JSON.parse(stored)
    checkLanguage()
    writeToDoc(weather)
  } else {
    checkLanguage()
    checkNavigator()
  }
}

// IS PREFERRED LANGUAGE AVAILABLE ?
function checkLanguage () {
  lang ? binarySearch(apiLangs, lang) : lang = 'en'
}

// SEARCH ALGO
function binarySearch (arr, find) {
  console.log('Starting binarySearch')
  let mid = arr.length / 2
  let midVal = arr[mid]
  console.log(`Middle value is: ${midVal}`)
  if (lang.indexOf(midVal) !== -1) {

  }
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

// BUILD REQUEST URL
function urlBuilder (position) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${lat},${lon}${queries}`
  const obj = { lat, lon, url }
  return obj
}

// API REQUEST CALLBACKS
request.onloadstart = _ => console.log('LOAD START')
request.onprogress = _ => console.log('LOADING')
// GET THE DATA AND STORE IT
request.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    // parse it, and, store it
    weather = JSON.parse(this.response)
    window.sessionStorage['saveMeCalls'] = this.response
    // continue report
    console.log('Dark Sky API Data:')
    console.log(weather)
  } else {
    window.alert('An error occured on retrieving data.')
  }
}
// WRITE DATA TO THE DOCUMENT
request.onloadend = _ => {
  console.log('LOAD END')
  writeToDoc(weather)
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
