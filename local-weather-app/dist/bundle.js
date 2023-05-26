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
/* harmony export (immutable) */ __webpack_exports__["a"] = urlBuilder;
/* harmony export (immutable) */ __webpack_exports__["b"] = getWeatherData;
/* eslint-env browser */

// const apiLangs = [
//   'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'de', 'el',
//   'en', 'es', 'et', 'fr', 'hr', 'hu', 'id', 'it', 'is', 'kw', 'nb', 'nl',
//   'pl', 'pt', 'ru', 'sk', 'sl', 'sr', 'sv', 'tet', 'tr', 'uk', 'x-pig-latin',
//   'zh', 'zh-tw'
// ]
// const weather = JSON.parse(window.sessionStorage.saveMeCalls) || false
// let scaleChar = weather ? weather.flags.units : ''

// NOTE: FUNCTIONAL CHECK 🆗
// BUILD REQUEST URL
function urlBuilder (position) {
  const lang = 'en'
  const key = '767b3baa2aca876fa6ea5e4fbd75228c'
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const darkSky = 'https://api.darksky.net/forecast/'
  const queries = `?exclude=minutely,hourly,daily&lang=${lang}&units=auto`
  const url = `${cors}${darkSky}${key}/${lat},${lon}${queries}`
  return url
}

// NOTE: FUNCTIONAL CHECK 🆗
// CALL API TO GET DATA
function getWeatherData (url) {
  return new Promise(function promiseResponse (resolve, reject) {
    const request = new XMLHttpRequest()
    // REQUEST CALLBACKS
    request.open('GET', url)
    request.onloadstart = _ => console.log('LOAD START')
    request.onprogress = _ => console.log('*')
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

// CHECK TEMP SCALE
// function tempScaleCheck () {
//   weather.flags.units === 'us' ? scaleChar = 'F' : scaleChar = 'C'
// }


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkNavigator;
/* eslint-env browser */
// MAYBE: add session storage comparison
//   if new position differs from stored position
// FEATURE: add timezone offset to written time
// FEATURE: add dark sky maps
//   <script type='text/javascript' src='https://maps.darksky.net/@apparent_temperature,41.350,-432.848,9.js?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_f'></script>
// REQUIREMENT: add toggle switch for temperature scale

// VARIABLES
// const select = element => document.querySelector(element)


// IS PREFERRED LANGUAGE AVAILABLE ?
// SEARCH ALGO FIXME: SPLIT INTO TWO SEARCHES, Add AWAIT
// async function binarySearchLanguage () {
//   let lang = window.navigator.language.toLowerCase()
//   let startIndex = 0
//   let stopIndex = apiLangs.length - 1
//   let mid = Math.floor((stopIndex + startIndex) / 2)
//   let isLang = apiLangs[mid].indexOf(lang) !== -1
//   let containsLang = lang.indexOf(apiLangs[mid]) !== -1

//   console.log('Starting binarySearch')
//   console.log(`Nav lang is: ${lang}, apiLangs middle value is: ${apiLangs[mid]}`)
//   while ((!isLang && !containsLang) && startIndex < stopIndex) {
//     // re-center
//     if (lang < apiLangs[mid]) {
//       stopIndex = mid - 1
//     } else if (lang > apiLangs[mid]) {
//       startIndex = mid + 1
//     }
//     mid = Math.floor((stopIndex + startIndex) / 2)
//     isLang = apiLangs.indexOf(lang) !== -1
//     containsLang = lang.indexOf(apiLangs[mid]) !== -1
//     console.log(`apiLangs middle value is: ${apiLangs[mid]}`)
//   }

//   if (isLang) {
//     console.log('Language is available.')
//   } else if (containsLang) {
//     lang = apiLangs[mid]
//     console.log(`Preferred localization unavailable, setting to default: ${lang}.`)
//   } else {
//     lang = 'en'
//     console.log('Preferred language unavailable, setting to English.')
//   }
//   return console.log(`Lang sent to API is: ${lang}`)
// }

// CHECK NAVIGATOR AND RETURN POSITION
function checkNavigator () {
  const geo = window.navigator.geolocation
  // GEOLOCATION AVAILABLE ?
  if (geo) {
    // yup, promise location
    return new Promise(function promiseLocation (resolve, reject) {
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 900000
      }
      // get location
      geo.getCurrentPosition(pos => resolve(pos), err => reject(err), geoOptions)
    })
  } else {
    // nope
    return window.alert('Geolocation unavailable.')
  }
}

// // WRITE TO THE DOC
// function writeToDoc () {
//   const location = `${weather.latitude}, ${weather.longitude}`
//   const current = weather.currently
//   const time = new Date(current.time * 1e3)
//   const isoTime = time.toISOString()
//   const utcTime = time.toUTCString()
//   // set scaleChar
//   tempScaleCheck()
//   // TODO: ADD IF ICON DEFINED FUNCTION + DEFAULT VALUE
//   // select('.icon').setAttribute('id', iconStr)

//   select('.location').innerHTML = location
//   select('.summary').innerHTML = current.summary
//   select('.temp').innerHTML = `${current.temperature}&#176;${scaleChar}`
//   select('time').setAttribute('datetime', isoTime)
//   select('time').innerHTML = utcTime
// }

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser_js__ = __webpack_require__(1);
/* eslint-env browser */



window.addEventListener('load', async function loaded () {
  console.log('DOCUMENT IS READY')
  try {
    window.sessionStorage.saveMeCalls = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__browser_js__["a" /* checkNavigator */])()
        .then(pos => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["a" /* urlBuilder */])(pos))
        .then(url => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_js__["b" /* getWeatherData */])(url))
    // writeToDoc(window.sessionStorage.saveMeCalls)
  } catch (error) { console.log(error) }
})

// TODO: if no Nav rej Promise.all and use dummy data


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map