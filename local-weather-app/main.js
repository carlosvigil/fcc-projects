'use strict'
/* eslint-env browser */

// VARIABLES
const select = (element) => document.querySelector(element)
const geoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: Infinity
}
const key = '129f708692983c0e4c3192f214aaf598'
const request = new XMLHttpRequest()
let weather

// IS DOC READY ?
;(function main (start) {
  if (document.readyState === 'complete') {
    console.log('DOCUMENT IS READY')
    start()
  } else {
    console.log('NOT READY, LISTENER & CALLBACK ADDED')
    window.addEventListener('load', () => start())
  }
}(checkNavigator))

// CHECK FOR LOCATION AVAILABILITY
function checkNavigator () {
  if (navigator.geolocation) {
    // YUP, GO
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions)
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
  let time = new Date(position.timestamp).toUTCString()
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${lon}`
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
    // PARSE IT
    weather = JSON.parse(this.response)
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
function writeToDoc (weather) {
  select('.location').innerHTML = `${weather.latitude}, ${weather.longitude}`
  select('.one-liner').innerHTML = weather.currently.summary
  // todo: logic for celsius or farenheit, checking api flags
  select('.temp').innerHTML = weather.currently.temperature
}
