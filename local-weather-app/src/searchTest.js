import setLanguage from './langSearch.js'
import { apiLangs } from './api.js'
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
    return setLanguage(arr, val)
  }

  // tests a single value
  function testSingle (val) {
    console.log('SINGLE TEST')
    return setLanguage(apiLangs, val)
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
  for (let val of apiLangs) {
    testArray(apiLangs, val) === val ? working.push(`\n${val}`) : failing.push(`\n${val}`)
  }

  return console.log(`\nWorking: ${working}\n\nFailing: ${failing}`)
})

//
// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
