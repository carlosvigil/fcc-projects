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
/* harmony export (immutable) */ __webpack_exports__["a"] = setLanguage;
// FEATURE: IS PREFERRED LANGUAGE & DIALECT AVAILABLE ?

function binarySearch (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let exact = arr[midIndex].indexOf(val) === 0
  let fuzzyCheck = val.indexOf(arr[midIndex]) === 0
  let fuzzyMatch
  // search
  while (!exact && lowIndex < highIndex) {
    // BUG: May iterate through all fuzzy matches instead of keeping best match
    fuzzyMatch = fuzzyCheck ? arr[midIndex] : null
    // re-center
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // reset checks
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    exact = arr[midIndex].indexOf(val) === 0
    fuzzyCheck = val.indexOf(arr[midIndex]) === 0
  }
  // return results
  if (exact) {
    return [2]
  } else if (fuzzyMatch) {
    return [1, fuzzyMatch]
  } else return 0
}
// let dev know if the preferred language is available; return string for api
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiLangs; });
/* unused harmony export dummyData */
/* unused harmony export urlBuilder */
/* unused harmony export getWeatherData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__langSearch_js__ = __webpack_require__(0);
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__langSearch_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_js__ = __webpack_require__(1);


/* eslint-env browser */
window.addEventListener('load', async function loaded () {
  console.log('DOCUMENT IS READY')
  console.log('-----------------------------------------\nTEST 1')
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], 'en')
  console.log('-----------------------------------------\nTEST 2')
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], 'zh')
  console.log('-----------------------------------------\nTEST 3')
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], 'zh-sg')
  console.log('-----------------------------------------\nTEST 4')
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], 'zh-tw')
  console.log('-----------------------------------------\nTEST 5')
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], 'en-us')
  console.log('-----------------------------------------\nTEST 6')
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], 'ja')
  return console.log('DONE')
})
//
// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data


/***/ })
/******/ ]);
//# sourceMappingURL=testBundle.js.map