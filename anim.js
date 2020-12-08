class anim {
  constructor(transf) {
    this.obj = transf;
    this.ct = 0;
    this.target = {};
    this.lastValues = {};
  }
  animTranslate(dx, dy, dur) {
    this.tdt = dur;
    this.ct = Date.now();
    this.target.x = dx;
    this.target.y = dy;
    this.lastValues.x = 0;
    this.lastValues.y = 0;
    this.fref = this._Trefresh;
    this._loop();
  }
  _Trefresh(te) {
    let tdx = te * this.target.x;
    let tdy = te * this.target.y;
    let sdx = tdx - this.lastValues.x;
    let sdy = tdy - this.lastValues.y;
    this.obj.setTranslate(sdx, sdy);
    this.lastValues.x = tdx;
    this.lastValues.y = tdy;
  }
  _loop() {
    let te = (Date.now() - this.ct) / (1000 * this.tdt);
    this.fref(te);
    if (te < 1) {
      window.requestAnimationFrame(() => this._loop());
    }
  }
}
