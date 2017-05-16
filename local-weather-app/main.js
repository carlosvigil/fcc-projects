'use strict'
/* eslint-env browser */

const geoOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 900000
}
const key = '129f708692983c0e4c3192f214aaf598'
const request = new XMLHttpRequest()

// IS DOC READY ?
;((fn) => {
  if (document.readyState !== 'loading') {
    console.log('DOCUMENT IS READY')
    fn()
  } else {
    console.log('NOT READY, LISTENER & CALLBACK ADDED')
    document.addEventListener('DOMContentLoaded', fn)
  }
})(checkNavigator())

// CHECK FOR LOCATION AVAILABILITY
function checkNavigator () {
  if (navigator.geolocation) {
    // YUP
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions)
  } else {
    // NOPE
    window.alert('Geolocation unavailable.')
  }
}

// GEOLOCATION SUCCESS CALLBACK
function geoSuccess (position) {
  let time = new Date(position.timestamp).toUTCString()
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const url = `https://api.darksky.net/forecast/${key}/${lat},${lon}`
  // GET DATA
  apiRequest(url)
  // CONSOLE REPORT
  console.log(`GEOLOCATION AVAILABLE
    Latest: ${time}
    Latitude: ${lat}
    Longitude: ${lon}
    Dark Sky Data: ${JSON.stringify(weather)}`)
}

// GEOLOCATION FAILURE CALLBACK
function geoFailure (error) {
  console.log(`ERROR: ${error.message}; CODE: ${error.code}.`)
}

// GET JSON THINGS
function apiRequest (url) {
  request.open('GET', url)
}
