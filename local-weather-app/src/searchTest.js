import setLanguage from './langSearch.js'
import { apiLangs } from './api.js'
/* eslint-env browser */
window.addEventListener('load', function loaded () {
  console.log('DOCUMENT IS READY')
  // passes the apiLang array of available Dark Sky languages to binsearch
  // FIXME: does not match middle 'is' in api array and first value 'af' in glang
  // weird list from weird google site TODO: add url
  const gLang = [
    'af', 'ach', 'ak', 'am', 'ar', 'az', 'be', 'bem', 'bg', 'bh', 'bn', 'br',
    'bs', 'ca', 'chr', 'ckb', 'co', 'crs', 'cs', 'cy', 'da', 'de', 'ee',
    'el', 'en', 'eo', 'es', 'es-419', 'et', 'eu', 'fa', 'fi', 'fo', 'fr',
    'fy', 'ga', 'gaa', 'gd', 'gl', 'gn', 'gu', 'ha', 'haw', 'hi', 'hr', 'ht',
    'hu', 'hy', 'ia', 'id', 'ig', 'is', 'it', 'iw', 'ja', 'jw', 'ka', 'kg',
    'kk', 'km', 'kn', 'ko', 'kri', 'ku', 'ky', 'la', 'lg', 'ln', 'lo', 'loz',
    'lt', 'lua', 'lv', 'mfe', 'mg', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms',
    'mt', 'ne', 'nl', 'nn', 'no', 'nso', 'ny', 'nyn', 'oc', 'om', 'or', 'pa',
    'pcm', 'pl', 'ps', 'pt-BR', 'pt-PT', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw',
    'sd', 'sh', 'si', 'sk', 'sl', 'sn', 'so', 'sq', 'sr', 'sr-ME', 'st',
    'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to',
    'tr', 'tt', 'tum', 'tw', 'ug', 'uk', 'ur', 'uz', 'vi', 'wo', 'xh',
    'xx-bork', 'xx-elmer', 'xx-hacker', 'xx-klingon', 'xx-pirate', 'yi',
    'yo', 'zh-CN', 'zh-TW', 'zu'
  ]

  function testSearch (arr, val) {
    console.log(`-----------------------------------------
        \ntestSearch: ${val}`)
    setLanguage(arr, val)
  }

  for (let val of gLang) {
    testSearch(gLang, val)
  }

  for (let val of apiLangs) {
    testSearch(apiLangs, val)
  }

  return console.log('DONE')
})
//
// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
