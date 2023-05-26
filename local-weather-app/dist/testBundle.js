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
// FIXME: Still ignores fuzzy matches, check if the indexes are correct

function binarySearch (arr, val) {
  let exactMatch = exact(arr, val)
  let fuzzyMatch = [0] // fuzzy(arr, val)

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
  let match = arr[midIndex] === val

  while (!match && lowIndex <= highIndex) {
    // change the center
    if (arr[midIndex] < val) { //
      lowIndex = midIndex + 1
    } else if (arr[midIndex] > val) { //
      highIndex = midIndex - 1
    }
    // these variables don't update unless reassigned
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    match = arr[midIndex] === val
  }
  return match
}

// fuzzy search function that accepts the first match
// function fuzzy (arr, val) {
//   let lowIndex = 0
//   let highIndex = arr.length - 1
//   let midIndex = Math.floor((lowIndex + highIndex) / 2)
//   let match = val.indexOf(arr[midIndex]) === 0

//   while (!match && lowIndex < highIndex) {
//     // change the center to reflect the decided halve of the arr
//     if (val < arr[midIndex]) {
//       highIndex = midIndex - 1
//     } else if (val > arr[midIndex]) {
//       lowIndex = midIndex + 1
//     }
//     // these variables don't update unless reassigned
//     midIndex = Math.floor((lowIndex + highIndex) / 2)
//     match = val.indexOf(arr[midIndex]) === 0
//   }
//   return [match, midIndex]
// }

// to provide a better UX, send best matched language string to the calling f()
function setLanguage (arr, lang) {
  const results = binarySearch(arr, lang)
  try {
    switch (results[0]) {
      case 2:
        console.log(`Preferred language is available. Add '${lang}' to api call.`)
        return lang
      case 1:
        console.log(`Preferred language dialect (${lang}) is unavailable. Add '${results[1]}' to api call.`)
        return results[1]
      default:
        console.log(`****************************** ERROR ******************************
      \nPreferred language (${lang}) is unavailable. Add 'en' to api call.`)
        return 'en'
    }
  } catch (error) {
    console.log(error)
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiLangs; });
/* unused harmony export dummyData */
/* unused harmony export darkSkyUrlBuilder */
/* unused harmony export googleMapsUrlBuilder */
/* unused harmony export callApi */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__langSearch_js__ = __webpack_require__(0);
/* eslint-env browser */


const apiLangs = [
  'ar', 'az', 'be', 'bg', 'bs', 'ca', 'cs', 'de', 'el', 'en', 'es', 'et', 'fr',
  'hr', 'hu', 'id', 'is', 'it', 'kw', 'nb', 'nl', 'pl', 'pt', 'ru', 'sk', 'sl',
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
        reject(Error(request.statusText))
      }
    }
    request.onerror = _ => reject(Error(`${service}: Network error on getting data.`))
    request.onloadend = _ => console.log(`${service}: LOAD END`)
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
window.addEventListener('load', function loaded () {
  console.log('DOCUMENT IS READY')
  // passes the apiLang array of available Dark Sky languages to binsearch
  // FIXME: does not match middle 'is' in api array and first value 'af' in glang
  // weird list from weird google site TODO: add url
  // const gLang = [
  //   'af', 'ach', 'ak', 'am', 'ar', 'az', 'be', 'bem', 'bg', 'bh', 'bn', 'br',
  //   'bs', 'ca', 'chr', 'ckb', 'co', 'crs', 'cs', 'cy', 'da', 'de', 'ee',
  //   'el', 'en', 'eo', 'es', 'es-419', 'et', 'eu', 'fa', 'fi', 'fo', 'fr',
  //   'fy', 'ga', 'gaa', 'gd', 'gl', 'gn', 'gu', 'ha', 'haw', 'hi', 'hr', 'ht',
  //   'hu', 'hy', 'ia', 'id', 'ig', 'is', 'it', 'iw', 'ja', 'jw', 'ka', 'kg',
  //   'kk', 'km', 'kn', 'ko', 'kri', 'ku', 'ky', 'la', 'lg', 'ln', 'lo', 'loz',
  //   'lt', 'lua', 'lv', 'mfe', 'mg', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms',
  //   'mt', 'ne', 'nl', 'nn', 'no', 'nso', 'ny', 'nyn', 'oc', 'om', 'or', 'pa',
  //   'pcm', 'pl', 'ps', 'pt-br', 'pt-pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw',
  //   'sd', 'sh', 'si', 'sk', 'sl', 'sn', 'so', 'sq', 'sr', 'sr-me', 'st',
  //   'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to',
  //   'tr', 'tt', 'tum', 'tw', 'ug', 'uk', 'ur', 'uz', 'vi', 'wo', 'xh',
  //   'xx-bork', 'xx-elmer', 'xx-hacker', 'xx-klingon', 'xx-pirate', 'yi',
  //   'yo', 'zh-cn', 'zh-tw', 'zu'
  // ]

  let working = []
  let failing = []

  // scans an array for matches
  function testArray (arr, val) {
    console.log(`-----------------------------------------
        \ntestSearch: ${val}`)
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(arr, val)
  }

  // tests a single value
  function testSingle (val) {
    console.log('SINGLE TEST')
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__langSearch_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], val)
  }

  // RUN TESTS
  testSingle('is')

  // test all of weird google list
  // working.push('\n***gLangs***')
  // for (let val of gLang) {
  //   testArray(apiLangs, val) === val ? working.push(`\n${val}`) : failing.push(`\n${val}`)
  // }

  // test the api languages
  working.push('\n***apiLangs***')
  for (let val of __WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */]) {
    testArray(__WEBPACK_IMPORTED_MODULE_1__api_js__["a" /* apiLangs */], val) === val ? working.push(`\n${val}`) : failing.push(`\n${val}`)
  }

  return console.log(`\nWorking: ${working}\n\nFailing: ${failing}`)
})

//
// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data


/***/ })
/******/ ]);
//# sourceMappingURL=testBundle.js.map