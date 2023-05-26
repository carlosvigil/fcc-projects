'use strict'
/* eslint-env browser */
// TODO: add session storage comparison to geoSuccess()
// TODO: create array of available languages and sort/search against navi.lang

// VARIABLES
const select = element => document.querySelector(element)
const geoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 500
}
const key = '129f708692983c0e4c3192f214aaf598'
const request = new XMLHttpRequest()
let lang = window.navigator.language
let weather
let stored = window.sessionStorage['saveMeCalls']

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
    // YUP, GET LOCATION
    window.navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions)
  } else {
    // NOPE
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
  const lat = 34.9247557//position.coords.latitude
  const lon = 143.1594287//position.coords.longitude
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${lat},${lon}${queries}`

  // CONSOLE REPORT
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
    // PARSE IT, AND, STORE IT
    weather = JSON.parse(this.response)
    window.sessionStorage = this.response
    // CONTINUE REPORT
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

// FINALLY, WRITE TO THE DOC
function writeToDoc (data) {
  const location = `${data.latitude}, ${data.longitude}`
  const time = new Date(data.currently.time * 1e3)
  const isoTime = time.toISOString()
  const utcTime = time.toUTCString()
  const current = data.currently

  select('.location').innerHTML = location
  select('.summary').innerHTML = data.currently.summary
  // todo: logic for celsius or farenheit, checking api flags
  select('.temp').innerHTML = `${current.temperature}&#176;`
  select('time').setAttribute('datetime', isoTime)
  select('time').innerHTML = utcTime
}
