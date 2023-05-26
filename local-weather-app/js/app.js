/* eslint-env browser */

const sky = new Skycons({'color': 'white'})

document.addEventListener('DOMContentLoaded', function loaded () {
  console.log('DOCUMENT IS READY')
  sky.add('icon', Skycons.CLEAR_DAY)
  sky.play()
// GO!
  ;(async function start () {
    console.log('START')
    if (stored) {
      console.log('Saving calls by using stored data.')
      weather = JSON.parse(stored)
      checkLanguage()
      writeToDoc(main.weather)
    } else {
      checkLanguage()
      checkNavigator()
    }
  })()
})
