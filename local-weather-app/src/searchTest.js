import setLanguage from './langSearch.js'
import { apiLangs } from './api.js'

window.addEventListener('load', function loaded () {
  console.log('DOCUMENT IS READY')
  const wLang = ['en-us', 'zh-sp', 'es-es']
  let exactMatch = []
  let fuzzyOrFail = []

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
  // singles
  testSingle('ja')

  // test all of weird list
  exactMatch.push('\nWLANGS::')
  fuzzyOrFail.push('\nWLANGS::')

  for (let val of wLang) {
    testArray(apiLangs, val) === val ? exactMatch.push(`\n${val}`) : fuzzyOrFail.push(`\n${val}`)
  }

  // test the api languages
  exactMatch.push('\nAPILANGS::')
  fuzzyOrFail.push('\nAPILANGS::')

  for (let val of apiLangs) {
    testArray(apiLangs, val) === val ? exactMatch.push(`\n${val}`) : fuzzyOrFail.push(`\n${val}`)
  }

  return console.log(`\nExact Match: ${exactMatch}\n\nFuzzy or Failing: ${fuzzyOrFail}`)
})

// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
