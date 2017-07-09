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

export { checkNavigator, writeToDoc }
