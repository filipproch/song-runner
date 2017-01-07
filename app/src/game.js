'use strict'

import { Level } from './model/level'

class Game {

  constructor (p5) {
    this.p5 = p5
  }

  setup () {
    console.log('Initializing the Game...')

    this.p5.createCanvas(this.p5.windowWidth, this.p5.windowHeight)
    this.level = new Level(this.p5)
  }

  draw () {
    this.p5.background('#2196F3')

    this.level.update()
    this.level.draw()
  }

  windowResized () {
    this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight)
  }

}

export { Game }
