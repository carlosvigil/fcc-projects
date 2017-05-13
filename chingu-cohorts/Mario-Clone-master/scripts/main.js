/* eslint-env browser */
/* use strict */

const level = document.querySelector('.level')
const levelContext = level.getContext('2d')
const view = document.querySelector('.view')
const viewContext = view.getContext('2d')

let lives = 3

// draw canvas
draw()

function draw () {
  drawLives()
}

function drawLives () {
  viewContext.font = '16px Verdana'
  viewContext.fillStyle = '#0095DD'
  viewContext.fillText(`Lives: ${lives}`, 15, 25)
}
