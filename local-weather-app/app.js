'use strict'
/* eslint-env browser */
// TODO: add session storage comparison

// VARIABLES
const select = element => document.querySelector(element)
const geoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 500
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
let weather
let stored = window.sessionStorage['saveMeCalls']
let scaleChar = ''

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
  if (stored) {
    console.log('Saving calls by using stored data.')
    weather = JSON.parse(stored)
    writeToDoc(weather)
  } else {
    checkNavigator()
  }
}

// CHECK FOR LOCATION AVAILABILITY
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
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${lat},${lon}${queries}`

  // console report
  console.log(`GEOLOCATION AVAILABLE
    Latest: ${time}
    Latitude: ${lat}
    Longitude: ${lon}`)
  // GET DATA
  request.open('GET', url)
  request.send()
}

// API REQUEST CALLBACKS
request.onloadstart = _ => console.log('LOAD START')
request.onprogress = _ => console.log('LOADING')
request.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    // parse it, and, store it
    weather = JSON.parse(this.response)
    window.sessionStorage = this.response
    // continue report
    console.log('Dark Sky API Data:')
    console.log(weather)
  } else {
    window.alert('An error occured on retrieving data.')
  }
}
request.onloadend = _ => {
  console.log('LOAD END')
  writeToDoc(weather)
}

// IS PREFERRED LANGUAGE AVAILABLE ?
;(function checkLanguage () {
  if (lang) {
    binarySearch(apiLangs, lang)
  } else {
    lang = 'en'
  }
}())

// SEARCH ALGO
function binarySearch (arr, find) {
  console.log('Starting binarySearch')
  let mid = arr.length / 2
  let midVal = arr[mid]
  console.log(`Middle value is: ${midVal}`)
  if (langCompare(midVal, lang)) { // TODO: FINISH BINARY SEARCH

  }
}

function langCompare (apiLang, lang) { // TODO: NOTE: MAY REPLACE WITH INDEXOF()

}

// CHECK TEMP SCALE
function tempScaleCheck (data) {
  if (data.flags.units === 'us') {
    scaleChar = 'F'
  } else {
    scaleChar = 'C'
  }
}

// FINALLY, WRITE TO THE DOC
function writeToDoc (data) {
  const location = `${data.latitude}, ${data.longitude}`
  const time = new Date(data.currently.time * 1e3)
  const isoTime = time.toISOString()
  const utcTime = time.toUTCString()
  const current = data.currently
  // set scaleChar
  tempScaleCheck(data)

  select('.location').innerHTML = location
  select('.summary').innerHTML = data.currently.summary
  select('.temp').innerHTML = `${current.temperature}&#176;${scaleChar}`
  select('time').setAttribute('datetime', isoTime)
  select('time').innerHTML = utcTime
}
