/* eslint-env browser */
import lang from 'main'

const key = ''
const request = new XMLHttpRequest()
const apiLangs = [
  'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'de', 'el',
  'en', 'es', 'et', 'fr', 'hr', 'hu', 'id', 'it', 'is', 'kw', 'nb', 'nl',
  'pl', 'pt', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin',
  'zh', 'zh-tw'
]

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
request.onload = function () { // TODO: return the parsed object
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

export { urlBuilder, apiLangs }
