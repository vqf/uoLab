class anim {
  constructor(transf) {
    this.obj = transf;
    let all = this.obj.transform.baseVal;
    this.translate = all.getItem(0);
    this.rotate = all.getItem(1);
    this.resize = all.getItem(2);
    this.queue = false;
    this.loop = {};
  }
  animTranslate(dx, dy, dur) {
    let current = {};
    let target = {};
    target.x = dx;
    target.y = dy;
    current.x = this.translate.matrix.e;
    current.y = this.translate.matrix.f;
    this.loop.translate = new _looper();
    this.loop.translate.loop("t", this, dur, current, target);
    return this.loop.translate;
  }
  then() {
    this.queue = true;
    return this;
  }
  animRotate(angle, x, y, dur) {
    let current = {};
    let target = {};
    target.angle = angle;
    target.x = x - this.translate.matrix.e;
    target.y = y - this.translate.matrix.f;
    current.angle = this.rotate.angle;
    if (!this.queue) {
      this.loop.rotate = new _looper();
    }
    this.loop.rotate.loop("r", this, dur, current, target);
    return this.loop.rotate;
  }
}

class _looper {
  constructor() {
    this.busy = false;
    this.queue = [];
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
  loop(type, info, dur, current, target) {
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
    this.ct = Date.now();
    if (this.busy) {
      this.queue.push([type, info, dur, current, target]);
    } else {
      this.busy = true;
      this._loop();
    }
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
      this.busy = false;
      if (this.queue.length > 0) {
        let opts = this.queue.shift();
        this.loop(opts[0], opts[1], opts[2], opts[3], opts[4]);
      }
    }
  }
}
