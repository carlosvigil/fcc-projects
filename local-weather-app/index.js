import * as main from 'main';
import * as skycons from 'skycons';
/* eslint-env browser */

const sky = new skycons.Skycons({ 'color': 'white' });

document.addEventListener('DOMContentLoaded', function loaded() {
  console.log('DOCUMENT IS READY');
  sky.add('icon', skycons.Skycons.CLEAR_DAY);
  sky.play();
  // // GO!
  //   ;(async function start () {
  //     console.log('START')
  //     if (main.stored) {
  //       console.log('Saving calls by using stored data.')
  //       main.weather = JSON.parse(main.stored)
  //       main.checkLanguage()
  //       main.writeToDoc(main.weather)
  //     } else {
  //       main.checkLanguage()
  //       main.checkNavigator()
  //     }
  //   })()
});
