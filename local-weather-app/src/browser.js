/* eslint-env browser */
// FEATURE: add session storage comparison
//   if new position differs from stored position
// FEATURE: add timezone offset to written time
// FEATURE: add dark sky maps
//   <script type='text/javascript' src='https://maps.darksky.net/@apparent_temperature,41.350,-432.848,9.js?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_f'></script>
// REQUIREMENT: add toggle switch for temperature scale

// FEATURE: IS PREFERRED LANGUAGE AVAILABLE ?
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

// FUNCTIONAL CHECK 🆗
// CHECK NAVIGATOR AND RETURN POSITION
export function checkNavigator () {
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

// WRITE TO THE DOC
export function writeToDoc (weather) {
  const elm = element => document.querySelector(element)
  const location = `${weather.latitude}, ${weather.longitude}`
  const current = weather.currently
  const time = new Date(current.time * 1e3)
  const isoTime = time.toISOString()
  const utcTime = time.toUTCString()
  let tempScale = weather.flags.units === 'us' ? 'F' : 'C'
  // REQUIREMENT: ADD IF ICON DEFINED FUNCTION + DEFAULT VALUE
  // select('.icon').setAttribute('id', iconStr)
  elm('.location').innerHTML = location
  elm('.summary').innerHTML = current.summary
  elm('.temp').innerHTML = `${current.temperature}&#176;${tempScale}`
  elm('time').setAttribute('datetime', isoTime)
  elm('time').innerHTML = utcTime
}
