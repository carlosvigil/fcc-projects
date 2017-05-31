/* eslint-env browser */
import { weather, checkLanguage, checkNavigator, writeToDoc } from './main.js'

const sky = new Skycons({'color': 'white'})

document.addEventListener('DOMContentLoaded', function loaded () {
  console.log('DOCUMENT IS READY')
  sky.add('icon', Skycons.CLEAR_DAY)
  sky.play()
// GO!
  ;(function start () {
    console.log('START')
    if (weather) {
      console.log('Saving calls by using stored data.')
      checkLanguage(weather)
      writeToDoc(weather)
    } else {
      checkLanguage()
      checkNavigator()
    }
  })()
})
