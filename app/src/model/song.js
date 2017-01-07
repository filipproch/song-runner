import P5 from 'p5'

class Song {

  constructor (p5, file) {
    this.fft = new P5.FFT()
    this.song = p5.loadSound(file, this._onLoaded.bind(this), this._onLoadFailed.bind(this), this._onLoadProgress.bind(this))
  }

  play () {
    if (this.song && this.song.isLoaded()) {
      this.song.play()
    }
  }

  setRate (rate) {
    this.song.rate(rate)
  }

  isLoaded () {
    return this.song && this.song.isLoaded()
  }

  analyze () {
    return this.fft.analyze(16)
  }

  _onLoaded () {
    // this.play()
    this.song.getPeaks(this.song.frames())
  }

  _onLoadFailed () {

  }

  _onLoadProgress () {

  }

}

export { Song }