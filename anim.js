class anim {
  constructor(transf) {
    this.parent = transf;
    this.uid = _uid();
    this.obj = transf.getInjected();
    let all = this.obj.transform.baseVal;
    this.translate = all.getItem(0);
    this.rotate = all.getItem(1);
    this.resize = all.getItem(2);
    this.queue = false;
    this.promises = [];
    this._initEvents();
    this.loop = new _looper();
  }
  _eventName(evName) {
    return evName + '_' + this.uid;
  }
  _registerEvent(eventName, f) {
    const evName = this._eventName(eventName);
    const result = new Event(evName);
    document.addEventListener(evName, function (e) {
      f(e);
    });
  }
  _initEvents() {
    this.events = {
      start: new Event('animStart_' + this.uid),
      end: new Event('animEnd_' + this.uid),
    };
  }
  animTranslate(dx, dy, dur) {
    let target = {};
    target.x = dx;
    target.y = dy;
    if (this.queue === true) {
      this.queue = false;
    } else {
      this.loop = new _looper();
    }
    this.loop.loop('t', this, dur, target);
    return this.loop;
  }
  then(f) {
    let pf = _def(f, null);
    this.queue = true;
    if (pf !== null) {
      this.promises.push(pf);
    }
    return this;
  }
  animRotate(angle, x, y, dur) {
    let target = {};
    target.angle = angle;
    target.x = x - this.translate.matrix.e;
    target.y = y - this.translate.matrix.f;
    if (this.queue === true) {
      this.queue = false;
    } else {
      this.loop = new _looper();
    }
    this.loop.loop('r', this, dur, target);
    return this.loop;
  }
  cleanPromises() {
    this.promises.forEach((p) => {
      p();
    });
    this.promises = [];
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
  loop(type, info, dur, target) {
    if (this.busy === true) {
      this.queue.push([type, info, dur, target]);
      if (this.info.promises.length > 0) {
        this.info.promises.forEach((p) => {
          this.queue.push(p);
        });
        this.info.promises = [];
      }
    } else {
      this.type = type;
      this.current = {};
      this.info = info;
      this.tdt = dur;
      this.target = target;
      this.ct = 0;
      this.callback = null;
      if (type === 't') {
        this.current.x = this.info.translate.matrix.e;
        this.current.y = this.info.translate.matrix.f;
        this.callback = this._Trefresh;
      } else if (type === 'r') {
        this.current.angle = this.info.rotate.angle;
        this.callback = this._Rrefresh;
      }
      this.ct = Date.now();
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
        if (typeof opts === 'function') {
          opts();
        } else {
          this.loop(opts[0], opts[1], opts[2], opts[3]);
        }
      } else {
        this.info.cleanPromises();
      }
      this.info.parent.getMessage('hasMoved');
    }
  }
}
nextModule();
