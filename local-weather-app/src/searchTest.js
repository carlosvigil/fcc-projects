import setLanguage from './langSearch.js'
import { apiLangs } from './api.js'
/* eslint-env browser */
window.addEventListener('load', function loaded () {
  console.log('DOCUMENT IS READY')
  // passes the apiLang array of available Dark Sky languages to binsearch
  // FIXME: does not match middle 'is' in api array and first value 'af' in glang
  // weird list from weird google site TODO: add url
  const wLang = ['en-us', 'zh-sp', 'es-es']

  let working = []
  let failing = []

  // scans an array for matches
  function testArray (arr, val) {
    console.log(`-----------------------------------------
        \ntestSearch: ${val}`)
    return setLanguage(arr, val)
  }

  // tests a single value
  function testSingle (val) {
    console.log('SINGLE TEST')
    return setLanguage(apiLangs, val)
  }

  // RUN TESTS
  // test all of weird list
  working.push('\nWLANGS::')
  failing.push('\nWLANGS::')

  for (let val of wLang) {
    testArray(apiLangs, val) === val ? working.push(`\n${val}`) : failing.push(`\n${val}`)
  }

  // test the api languages
  working.push('\nAPILANGS::')
  failing.push('\nAPILANGS::')

  for (let val of apiLangs) {
    testArray(apiLangs, val) === val ? working.push(`\n${val}`) : failing.push(`\n${val}`)
  }

  return console.log(`\nWorking: ${working}\n\nFailing: ${failing}`)
})

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
