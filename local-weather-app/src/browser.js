/* eslint-env browser */
// REQUIREMENT: add toggle switch for temperature scale
// FEATURE: add session storage comparison
//   "if new position differs from stored position"
// FEATURE: add timezone offset to written time
// FEATURE: add dark sky maps
//   <script type='text/javascript' src='https://maps.darksky.net/@apparent_temperature,41.350,-432.848,9.js?embed=true&timeControl=true&fieldControl=true&defaultField=temperature&defaultUnits=_f'></script>

// FUNCTIONAL CHECK 🆗
// CHECK NAVIGATOR AND RETURN POSITION
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
// WRITE TO THE DOC
function writeToDoc (weather) {
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

export { checkNavigator, writeToDoc }
