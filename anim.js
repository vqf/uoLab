class anim {
  constructor(transf) {
    this.obj = transf;
    this.ct = 0;
  }
  animate(by, dur) {
    this.obj.by = by;
    this.tdt = dur;
    this.ct = Date.now();
    this._loop();
  }
  _loop() {
    let te = (Date.now() - this.ct) / (1000 * this.tdt);
    this.obj.by = this.by * te;
    if (te < 1) {
      window.requestAnimationFrame(this._loop());
    }
  }
}
