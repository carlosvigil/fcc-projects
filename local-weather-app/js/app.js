import * as main from 'main'
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', function loaded () {
  console.log('DOCUMENT IS READY')

// GO!
  ;(async function start () {
    console.log('START')
    if (main.stored) {
      console.log('Saving calls by using stored data.')
      main.weather = JSON.parse(main.stored)
      main.checkLanguage()
      main.writeToDoc(main.weather)
    } else {
      main.checkLanguage()
      main.checkNavigator()
    }
  })()
})
