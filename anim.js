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
    this.lastValues.x = this.obj.matrix.e;
    this.lastValues.y = this.obj.matrix.f;
    this.fref = this._Trefresh;
    this._loop();
  }
  animRotate(angle, x, y, dur) {
    this.tdt = dur;
    this.ct = Date.now();
    this.target.angle = angle;
    this.target.x = x;
    this.target.y = y;
    this.lastValues.angle = this.obj.angle;
    this.fref = this._Rrefresh;
    this._loop();
  }
  _Trefresh(te) {
    let tdx = te * this.target.x;
    let tdy = te * this.target.y;
    let sdx = tdx + this.lastValues.x;
    let sdy = tdy + this.lastValues.y;
    this.obj.setTranslate(sdx, sdy);
  }
  _Rrefresh(te) {
    let ta = te * this.target.angle;
    let ss = ta + this.lastValues.angle;
    this.obj.setRotate(ss, this.target.x, this.target.y);
  }
  _loop() {
    let te = (Date.now() - this.ct) / (1000 * this.tdt);
    this.fref(te);
    if (te < 1) {
      window.requestAnimationFrame(() => this._loop());
    } else {
      this.fref(1);
    }
  }
}
