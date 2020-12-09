class anim {
  constructor(transf) {
    this.obj = transf;
    let all = this.obj.transform.baseVal;
    this.translate = all.getItem(0);
    this.rotate = all.getItem(1);
    this.resize = all.getItem(2);
    this.loop = {};
    this.target = {};
    this.lastValues = {};
  }
  animTranslate(dx, dy, dur) {
    this.tdt = dur;
    this.ct = Date.now();
    this.target.x = dx;
    this.target.y = dy;
    this.lastValues.x = this.translate.matrix.e;
    this.lastValues.y = this.translate.matrix.f;
    this.fref = this._Trefresh;
    this.loop.translate = new _looper("t", this);
    this.loop.translate._loop();
  }
  animRotate(angle, x, y, dur) {
    this.tdt = dur;
    this.ct = Date.now();
    this.target.angle = angle;
    this.target.x = x - this.translate.matrix.e;
    this.target.y = y - this.translate.matrix.f;
    this.lastValues.angle = this.rotate.angle;
    this.fref = this._Rrefresh;
    this.loop.rotate = new _looper("r", this);
    this.loop.rotate._loop();
  }
}

class _looper {
  constructor(type, info) {
    this.type = type;
    this.info = info;
    this.ct = 0;
    this.callback = null;
    if (type === "t") {
      this.callback = this._Trefresh;
    } else if (type === "r") {
      this.callback = this._Rrefresh;
    }
  }
  _Trefresh(te) {
    let tdx = te * this.info.target.x;
    let tdy = te * this.info.target.y;
    let sdx = tdx + this.info.lastValues.x;
    let sdy = tdy + this.info.lastValues.y;
    this.info.translate.setTranslate(sdx, sdy);
  }
  _Rrefresh(te) {
    let ta = te * this.info.target.angle;
    let ss = ta + this.info.lastValues.angle;
    this.info.rotate.setRotate(ss, this.info.target.x, this.info.target.y);
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
