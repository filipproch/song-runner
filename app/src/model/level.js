import { Player } from './player'
import { Pylon } from './pylon'
import { Song } from './song'

class Level {

  constructor (p5) {
    this.p5 = p5

    this.floorHeight = 100

    this.player = new Player(p5)
    this.pylons = []

    for (let i = 0; i < 20; i++) {
      let pylon = new Pylon(p5)
      pylon.setLocation(100 + pylon.WIDTH * i, this.p5.windowHeight - this.floorHeight)
      pylon.setHeight(this.p5.random(300))
      this.pylons.push(pylon)
    }

    this.song = new Song(p5, './test-files/albatroz.mp3')
  }

  update () {
    this.player.update()
    this.pylons.forEach(pylon => pylon.update())

    if (this.song.isLoaded()) {
      this.song.analyze().forEach((peak, i) => {
        if (this.pylons[ i ]) {
          this.pylons[ i ].setHeight(peak)
        }
      })
    }
  }

  draw () {
    // floor
    this.p5.fill('#E91E63')
    this.p5.noStroke()
    this.p5.rect(0, this.p5.windowHeight - this.floorHeight, this.p5.windowWidth, this.floorHeight)

    this.p5.fill('#AD1457')
    this.p5.quad(
      -50, this.p5.windowHeight - this.floorHeight,
      this.p5.windowWidth, this.p5.windowHeight - this.floorHeight,
      this.p5.windowWidth + 50, this.p5.windowHeight - this.floorHeight - 50,
      0, this.p5.windowHeight - this.floorHeight - 50
    )

    this.pylons
      .sort((pylonA, pylonB) => pylonB.position.x - pylonA.position.x)
      .forEach(pylon => pylon.draw())
  }

}

export { Level }