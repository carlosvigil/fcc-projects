import setLanguage from './langSearch.js'
import { apiLangs } from './api.js'
/* eslint-env browser */
window.addEventListener('load', async function loaded () {
  console.log('DOCUMENT IS READY')
  console.log('-----------------------------------------\nTEST 1')
  setLanguage(apiLangs, 'en')
  console.log('-----------------------------------------\nTEST 2')
  setLanguage(apiLangs, 'zh')
  console.log('-----------------------------------------\nTEST 3')
  setLanguage(apiLangs, 'zh-sg')
  console.log('-----------------------------------------\nTEST 4')
  setLanguage(apiLangs, 'zh-tw')
  console.log('-----------------------------------------\nTEST 5')
  setLanguage(apiLangs, 'en-us')
  console.log('-----------------------------------------\nTEST 6')
  setLanguage(apiLangs, 'ja')
  return console.log('DONE')
})
//
// promiseWeather = Promise.all()
//     .then(writeToDoc(storedData))
//     .catch(error => console.log(error))
// if no Nav rej Promise.all and use dummy data
