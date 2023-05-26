/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export apiLangs */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return dummyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return darkSkyUrlBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return googleMapsUrlBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return callApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__langSearch_js__ = __webpack_require__(3);
/* eslint-env browser */


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
  const lang = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(apiLangs, browserBits.lang)
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




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkNavigator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return writeToDoc; });
/* eslint-env browser */
// REQUIREMENT: add toggle switch for temperature scale
// FEATURE: add session storage comparison
//   "if new position differs from stored position"
// FEATURE: add timezone offset to written time
// FEATURE: add dark sky maps
//   <script type='text/javascript' src='https://maps.darksky.net/@apparent_temperature,41.350,-432.848,9.js?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_f'></script>

// FUNCTIONAL CHECK 🆗
/* Check if location services are available to avoid uneccessary processing,
*  and if they are use them to provide the API call a set of coordinates. */
function checkNavigator () {
  const geo = window.navigator.geolocation
  // GEOLOCATION AVAILABLE ?
  if (geo) {
    // yup, promise location
    console.log('Geolocation is available.')
    return new Promise(function promiseLocation (resolve, reject) {
      const geoOptions = { enableHighAccuracy: true, timeout: 15000, maximumAge: 900000 }
      geo.getCurrentPosition(pos => resolve(pos), err => reject(err), geoOptions)
    })
  } else {
    return window.alert('Geolocation unavailable.')
  }
}

// TODO: Write address
// FUNCTIONAL CHECK ❔
// Present the data returned from the rest of the application to the UI
function writeToDoc (weather, address) {
  const elm = element => document.querySelector(element)
  // const coordinates = `${weather.latitude}, ${weather.longitude}`
  const addressString = address.results[1].formatted_address
  const current = weather.currently
  const time = new Date(current.time * 1e3)
  const isoTime = time.toISOString()
  const utcTime = time.toUTCString()

  if (weather.flags.units === 'us') elm('#switch').checked = true

  // REQUIREMENT: ADD IF ICON DEFINED FUNCTION + DEFAULT VALUE
  // select('.icon').setAttribute('id', iconStr)
  elm('.location').innerHTML = addressString
  elm('.summary').innerHTML = current.summary
  elm('.temp').innerHTML = `${current.temperature}&#176;`
  elm('time').setAttribute('datetime', isoTime)
  elm('time').innerHTML = utcTime
}

// function toggleScale () {
//   const toggle = document.querySelector('#switch')
//   let checked = toggle.checked === true

//   toggle.addEventListener("click", function() {
//     if (checked) {
//       return
//     } else {

//     }
//   })
// }




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser_js__ = __webpack_require__(1);
/* eslint-env browser */



// Wait for everything to load, avoiding document timing issues
window.addEventListener('load', async function loaded () {
  let weather = window.sessionStorage.darkSky
  let address = window.sessionStorage.googleMaps

  // don't make unnecessary calls
  if (!weather) {
    try {
      window.sessionStorage.googleMaps = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["a" /* checkNavigator */])()
          .then(pos => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["a" /* callApi */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["b" /* googleMapsUrlBuilder */])(pos), 'Google Maps'))
      window.sessionStorage.darkSky = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["a" /* checkNavigator */])()
          .then(pos => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["a" /* callApi */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["c" /* darkSkyUrlBuilder */])(pos), 'Dark Sky'))
      weather = JSON.parse(window.sessionStorage.darkSky)
      address = JSON.parse(window.sessionStorage.googleMaps)
    } catch (error) {
      console.log(error)
      console.log('Using placeholder data.')
      weather = __WEBPACK_IMPORTED_MODULE_0__api_js__["d" /* dummyData */]
      address = 'Seymour, CT, USA'
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["b" /* writeToDoc */])(weather)
  } else {
    console.log('Using data from session storage.')
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["b" /* writeToDoc */])(JSON.parse(weather), JSON.parse(address))
  }
  return console.log('DONE')
})

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setLanguage;
// FEATURE: IS PREFERRED LANGUAGE & DIALECT AVAILABLE ?
// FIXME: Still ignores fuzzy matches, check if the indexes are correct

function binarySearch (arr, val) {
  let exactMatch = exact(arr, val)
  let fuzzyMatch = fuzzy(arr, val)

  // return search results
  if (exactMatch) return [2]
  else if (fuzzyMatch[0] === 1) return fuzzyMatch
  else return [0]
}

// does nothing if lang is in supported api langs array and the app continues
function exact (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let match = arr[midIndex].indexOf(val) === 0

  while (!match && lowIndex < highIndex) {
    // change the center to reflect the decided halve of the arr
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // these variables don't update unless reassigned
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    match = arr[midIndex].indexOf(val) === 0
  }
  return match
}

// fuzzy search function that accepts the first match
function fuzzy (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let match = val.indexOf(arr[midIndex]) === 0

  while (!match && lowIndex < highIndex) {
    // change the center to reflect the decided halve of the arr
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // these variables don't update unless reassigned
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    match = val.indexOf(arr[midIndex]) === 0
  }
  return [match, midIndex]
}

// to provide a better UX, send best matched language string to the calling f()
function setLanguage (arr, lang) {
  const results = binarySearch(arr, lang)
  switch (results[0]) {
    case 2:
      console.log(`Preferred language is available. Add '${lang}' to api call.`)
      return lang
    case 1:
      console.log(`Preferred language dialect (${lang}) is unavailable. Add '${results[1]}' to api call.`)
      return results[1]
    default:
      console.log(`Preferred language (${lang}) is unavailable. Add 'en' to api call.`)
      return 'en'
  }
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map