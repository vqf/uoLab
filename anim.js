class anim {
  constructor(transf) {
    this.obj = transf;
    let all = this.obj.transform.baseVal;
    this.translate = all.getItem(0);
    this.rotate = all.getItem(1);
    this.resize = all.getItem(2);
    this.loop = {};
  }
  animTranslate(dx, dy, dur) {
    let current = {};
    let target = {};
    target.x = dx;
    target.y = dy;
    current.x = this.translate.matrix.e;
    current.y = this.translate.matrix.f;
    this.loop.translate = new _looper("t", this, dur, current, target);
    this.loop.translate.loop();
  }
  animRotate(angle, x, y, dur) {
    let current = {};
    let target = {};
    target.angle = angle;
    target.x = x - this.translate.matrix.e;
    target.y = y - this.translate.matrix.f;
    current.angle = this.rotate.angle;
    this.loop.rotate = new _looper("r", this, dur, current, target);
    this.loop.rotate.loop();
  }
}

class _looper {
  constructor(type, info, dur, current, target) {
    this.type = type;
    this.info = info;
    this.tdt = dur;
    this.current = current;
    this.target = target;
    this.ct = 0;
    this.callback = null;
    if (type === "t") {
      this.callback = this._Trefresh;
    } else if (type === "r") {
      this.callback = this._Rrefresh;
    }
  }
  _Trefresh(te) {
    let tdx = te * this.target.x;
    let tdy = te * this.target.y;
    let sdx = tdx + this.current.x;
    let sdy = tdy + this.current.y;
    this.info.translate.setTranslate(sdx, sdy);
  }
  _Rrefresh(te) {
    let ta = te * this.target.angle;
    let ss = ta + this.current.angle;
    this.info.rotate.setRotate(ss, this.target.x, this.target.y);
  }
  loop() {
    this.ct = Date.now();
    this._loop();
  }
  _loop() {
    let te = 1;
    if (this.tdt > 0) {
      te = (Date.now() - this.ct) / (1000 * this.tdt);
    }
    this.callback(te);
    if (te < 1) {
      window.requestAnimationFrame(() => this._loop());
    } else {
      this.callback(1);
    }
  }
}
