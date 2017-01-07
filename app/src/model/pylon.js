class Pylon {

  constructor (p5) {
    this.p5 = p5

    this.WIDTH = 50

    this.position = p5.createVector()
    this.height = 0
  }

  setLocation (x, y) {
    this.position.set(x, y)
  }

  setHeight (height) {
    this.height = height
  }

  update () {
  }

  draw () {
    this.p5.fill('#C2185B')
    this.p5.noStroke()

    this.p5.rect(this.position.x, this.position.y - this.height, this.WIDTH, this.height)

    this.p5.fill('#D81B60')
    this.p5.quad(
      this.position.x, this.position.y - this.height,
      this.position.x + this.WIDTH, this.position.y - this.height,
      this.position.x + this.WIDTH / 2, this.position.y - this.height - 50,
      this.position.x - this.WIDTH / 2, this.position.y - this.height - 50
    )

    this.p5.fill('#880E4F')
    this.p5.quad(
      this.position.x, this.position.y - this.height,
      this.position.x, this.position.y,
      this.position.x - this.WIDTH / 2, this.position.y - 50,
      this.position.x - this.WIDTH / 2, this.position.y - this.height - 50
    )
  }

}

export { Pylon }