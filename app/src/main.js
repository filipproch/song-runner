import P5 from 'p5'
import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'

import { Game } from './game'

new P5(function (p) {
  let game = new Game(p)

  p.setup = game.setup.bind(game)
  p.draw = game.draw.bind(game)
  p.windowResized = game.windowResized.bind(game)
})