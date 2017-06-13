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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return dummyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return urlBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getWeatherData; });
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
// BUILD REQUEST URL
function urlBuilder (position) {
  const browserLang = window.navigator.language.toLowerCase()
  const lang = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(apiLangs, browserLang)
  const key = '767b3baa2aca876fa6ea5e4fbd75228c'
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${lat},${lon}${queries}`
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

// FUNCTIONAL CHECK ❔
// Present the data returned from the rest of the application to the UI
function writeToDoc (weather) {
  const elm = element => document.querySelector(element)
  const coordinates = `${weather.latitude}, ${weather.longitude}`
  const current = weather.currently
  const time = new Date(current.time * 1e3)
  const isoTime = time.toISOString()
  const utcTime = time.toUTCString()

  if (weather.flags.units === 'us') elm('#switch').checked = true
  
  // REQUIREMENT: ADD IF ICON DEFINED FUNCTION + DEFAULT VALUE
  // select('.icon').setAttribute('id', iconStr)
  elm('.location').innerHTML = coordinates
  elm('.summary').innerHTML = current.summary
  elm('.temp').innerHTML = `${current.temperature}&#176;`
  elm('time').setAttribute('datetime', isoTime)
  elm('time').innerHTML = utcTime
}




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
  let weather = window.sessionStorage.saveMeCalls

  // don't make unnecessary calls, api is free; and, if any error, use old data
  if (!weather) {
    try {
      window.sessionStorage.saveMeCalls = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["a" /* checkNavigator */])()
          .then(pos => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["a" /* getWeatherData */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["b" /* urlBuilder */])(pos)))
      weather = JSON.parse(window.sessionStorage.saveMeCalls)
    } catch (error) {
      console.log(error)
      console.log('Using dummy data.')
      weather = __WEBPACK_IMPORTED_MODULE_0__api_js__["c" /* dummyData */]
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["b" /* writeToDoc */])(weather)
  } else {
    console.log('Using session storage.')
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["b" /* writeToDoc */])(JSON.parse(weather))
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

// It's faster to use a search other than linear, but no benchmarks for this yet
function binarySearch (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let exact = arr[midIndex].indexOf(val) === 0
  let fuzzyCheck = val.indexOf(arr[midIndex]) === 0
  let fuzzyMatch

  while (!exact && lowIndex < highIndex) {
    // BUG: May iterate through all fuzzy matches instead of keeping best match
    fuzzyMatch = fuzzyCheck ? arr[midIndex] : null
    // change the center to reflect the decided halve of the arr
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // these variables don't update unless reassigned
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    exact = arr[midIndex].indexOf(val) === 0
    fuzzyCheck = val.indexOf(arr[midIndex]) === 0
  }

  if (exact) {
    return [2]
  } else if (fuzzyMatch) {
    return [1, fuzzyMatch]
  } else return 0
}
// to provide a better UX send a best matched language string to the calling f()
function setLanguage (arr, lang) {
  const results = binarySearch(arr, lang)
  switch (results[0]) {
    case 2:
      console.log(`Preferred language is available. Add '${lang}' to api call.`)
      return lang
    case 1:
      console.log(`Preferred language dialect is unavailable. Add '${results[1]}' to api call.`)
      return results[1]
    default:
      console.log('Preferred language is unavailable. Add \'en\' to api call.')
      return 'en'
  }
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map