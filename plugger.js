function _uid() {
  let l = 10;
  let result = '';
  let letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
  ];
  for (let i = 0; i < l; i++) {
    let tl = 0;
    for (let j = 0; j < 4; j++) {
      tl = tl << 1;
      let r = Math.random();
      if (r > 0.5) {
        tl++;
      }
    }
    result += letters[tl];
  }
  return result;
}

function _def() {
  var result = '';
  for (var i = 0; i < arguments.length; i++) {
    var r = arguments[i];
    if (typeof r !== 'undefined' && r !== '') {
      return r;
    }
  }
  return result;
}

function _ex(o) {
  let result = true;
  if (typeof o === 'undefined' || o === undefined || o === null) {
    result = false;
  }
  return result;
}

function toggleClass(obj, classname) {
  if (obj.classList.contains(classname)) {
    obj.classList.remove(classname);
  } else {
    obj.classList.add(classname);
  }
}

class plugger {
  constructor(parent, obj, jscode, style) {
    this.parent = parent;
    this.publicuid = 'amnfabenfo';
    this.uid = _uid();
    this.scene = null;
    this.scaleCorrection = 1;
    this.injected = null;
    if (parent instanceof scene) {
      this.scene = parent;
      this.parent = parent.getSvg();
    }
    this.obj = _def(obj);
    this.jscode = _def(jscode.toString());
    this.style = _def(style);
    this.backup = {
      jscode: _def(jscode.toString()),
      style: _def(style),
    };
    this.pt = this.parent.createSVGPoint();
    //
    this._init();
  }

  _init() {
    this._hoverfilter();
    this.closest = null;
    // Status, links
    this.state = {};
    this.state.noClash = {};
    this.linkedTo = {};
    this.lastPos = null;
    this.cpos = null;
    this.pos = null;
    this.angle = null;
    this.resize = null;
    this.pos = this.parent.createSVGTransform();
    this.angle = this.parent.createSVGTransform();
    this.resize = this.parent.createSVGTransform();
    this.inverse = this.parent.createSVGTransform();
    this.injected = null;
    this.anim = {};
    this.drag = this._dragData();
  }

  reset() {
    Object.keys(this.backup).forEach((k) => {
      this[k] = this.backup[k];
    });
  }

  broadcast(msg) {
    let myself = this;
    const objs = Object.keys(this.linkedTo);
    objs.forEach((k) => {
      this.linkedTo[k].getMessage(msg, myself);
    });
  }

  clashesWith(obj) {
    let result = true;
    let uid = obj._uid();
    if (this.state.noClash.hasOwnProperty(uid)) {
      result = false;
    }
    return result;
  }

  _uid() {
    return this.uid;
  }

  _add(where, el) {
    let tuid = el.id;
    let o = document.getElementById(tuid);
    if (o === null) {
      where.appendChild(el);
    }
  }

  _addSVGDef(el) {
    let d = this.parent.querySelector('defs');
    if (d === null) {
      let df = {
        tag: 'defs',
      };
      d = this.parent.appendChild(loadSVGTag(df));
    }
    d.appendChild(el);
  }

  _mine(n) {
    return n + this.publicuid;
  }

  highlightOn() {
    this.injected.classList.add(`${this._mine('high')}`);
  }
  highlightOff() {
    this.injected.classList.remove(`${this._mine('high')}`);
  }

  _hoverfilter() {
    let s = {
      tag: 'style',
      id: this._mine('st'),
      content: `
        .${this._mine('g')}:hover, .${this._mine('high')}{
          filter: url("#${this._mine('blur')}")
        }
      `,
    };
    let f = {
      tag: 'filter',
      id: this._mine('blur'),
      content: [
        {
          tag: 'feDropShadow',
          dx: 0.2,
          dy: 0.2,
          stdDeviation: 0.5,
        },
      ],
    };
    let st = loadSVGTag(s);
    this._addSVGDef(st);
    let c = loadSVGTag(f);
    this._add(this.parent, c);
  }

  unlink(id) {
    delete this.linkedTo[id];
  }

  getBoundingBox(lid) {
    let el = this.injected;
    if (typeof lid !== 'undefined') {
      el = this.getElementByLocalId(lid);
    }
    return el.getBoundingClientRect();
  }

  _dragData() {
    let result = {
      isDragging: false,
      from: {
        x: 0,
        y: 0,
      },
      time: Date.now(),
      dt: '0s',
      dtms: 0,
      dragEvents: {
        mousedown: null,
        mouseup: null,
        mousemove: null,
      },
    };
    return result;
  }

  addEventListener(evt, f, lid) {
    let el = this.injected;
    if (typeof lid !== undefined) {
      el = this.getElementByLocalId(lid);
    }
    let myself = this;
    let onthefly = function (e) {
      f(e, myself);
    };
    el.addEventListener(evt, onthefly);
  }

  getElementByLocalId(lid) {
    let id = lid + this.uid;
    let result = document.getElementById(id);
    return result;
  }

  setPos(x, y) {
    x = _def(x);
    y = _def(y);
    this.pos.setTranslate(x, y);
    this.cpos = [x, y];
    /*Object.keys(this.linkedTo).forEach(k => {
      this.linkedTo[k].setPos(x, y);
    });*/
  }
  setAngle(a, x, y) {
    if (typeof x === 'undefined') {
      x = 0;
      y = 0;
    }
    this.angle.setRotate(a, x, y);
  }

  _pointer(x, y) {
    let d = loadSVGTag({
      tag: 'circle',
      cx: x,
      cy: y,
      r: 10,
      class: 'pointer',
    });
    this.parent.appendChild(d);
  }

  then(f) {
    this.anim.then(f);
    return this;
  }

  rotate(angle, dur, x, y) {
    let bb = this.getBoundingBox();
    if (typeof x === 'undefined') {
      x = bb.width / 2;
      y = bb.height / 2;
      //this._pointer(x, y);
    }
    x += bb.x;
    y += bb.y;
    if (typeof dur === 'undefined' || dur === undefined) {
      dur = 1;
    }

    this.anim.animRotate(angle, x, y, dur);
    return this;
  }

  move(dx, dy, dur) {
    if (typeof dur === undefined || dur === undefined) {
      dur = 1;
    }
    this.anim.animTranslate(dx, dy, dur);
    return this;
  }

  scale(sx, sy) {
    this.resize.setScale(sx, sy);
  }

  _transformAbsPoint(x, y) {
    var svg = this.parent;
    var pt = this.pt;
    pt.x = x;
    pt.y = y;
    var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
    var cx = loc.x;
    var cy = loc.y;
    return [cx, cy, loc.x, loc.y];
  }
  _actOnMouse(evt) {
    var x = 0;
    var y = 0;
    if (typeof evt.touches !== 'undefined' && evt.touches.length > 0) {
      // Tablet
      x = evt.touches[0].clientX;
      y = evt.touches[0].clientY;
    } else {
      x = evt.clientX;
      y = evt.clientY;
    }
    var result = this._transformAbsPoint(x, y);
    result.push(evt);
    return result;
  }

  _startDrag(e) {
    this.drag.isDragging = true;
    const pt = this._actOnMouse(e);
    this.drag.from.dx = pt[0] - this.pos.matrix.e;
    this.drag.from.dy = pt[1] - this.pos.matrix.f;
    this.drag.time = Date.now();
  }

  _drag(e) {
    const pt = this._actOnMouse(e);
    const dx = pt[0] - this.drag.from.dx;
    const dy = pt[1] - this.drag.from.dy;
    this.setPos(dx, dy);
    this.getMessage('hasMoved');
  }
  _endDrag(e) {
    if (this.drag.isDragging === true) {
      this.drag.isDragging = false;
      this.getMessage('mouseUp');
    }
  }

  makeDraggable(obj) {
    let myself = this;
    this.drag.dragEvents.mousedown = obj.addEventListener(
      'mousedown',
      function (e) {
        myself._startDrag(e);
      }
    );
    this.drag.dragEvents.mousemove = document.addEventListener(
      'mousemove',
      function (e) {
        let ct = Date.now();
        let dt = ct - myself.drag.time;
        if (myself.drag.isDragging === true && dt >= myself.drag.dtms) {
          myself._drag(e);
          myself.drag.time = Date.now();
        }
      }
    );
    this.drag.dragEvents.mouseup = document.addEventListener(
      'mouseup',
      function (e) {
        myself._endDrag(e);
      }
    );
  }

  _initInjected() {
    this.injected.transform.baseVal.clear();
    this.injected.transform.baseVal.appendItem(this.pos);
    this.injected.transform.baseVal.appendItem(this.angle);
    this.injected.transform.baseVal.appendItem(this.resize);
    this.injected.transform.baseVal.appendItem(this.inverse);
    let myself = this;
    this.anim = new anim(myself);
    this.scale(this.scaleCorrection, this.scaleCorrection);
  }

  getInjected() {
    return this.injected;
  }

  getMessage(msg, sender) {
    let from = _def(sender, null);
    if (this.scene instanceof scene) {
      if (msg === 'hasMoved') {
        let myself = this;
        this.scene._clearObjectGrid(myself);
        this.scene._calcSpace(myself);
        this.closest = this.scene.closest(myself, 2);
      }
      if (msg === 'clash') {
        this.setPos(this.lastPos[0], this.lastPos[1]);
        this._endDrag();
      }
      if (msg === 'safePos') {
        if (this.cpos !== null) {
          this.lastPos = [this.cpos[0], this.cpos[1]];
        }
      }
    }
  }

  _transformBox(bx, mat) {
    let result = {};
    this.pt.x = bx.x;
    this.pt.y = bx.y;
    var loc = this.pt.matrixTransform(mat);
    result.x = loc.x;
    result.y = loc.y;
    this.pt.x = bx.right;
    this.pt.y = bx.bottom;
    loc = this.pt.matrixTransform(mat);
    result.width = Math.abs(loc.x - result.x);
    result.height = Math.abs(loc.y - result.y);
    return result;
  }

  link(obj) {
    let uid = obj._uid();
    this.linkedTo[uid] = obj;
    if (obj.injected !== null) {
      obj.injected.parentNode.removeChild(obj.injected);
      obj.injected = null;
      obj._init();
      //obj.reset();
    }
    //obj._shadow();
    const cmat = this.injected.getCTM();
    cmat.e = 0;
    cmat.f = 0;
    obj.injected = this.injected.appendChild(obj.obj);
    obj.inverse.setMatrix(cmat.inverse());
    //console.log(obj.injected.transform.baseVal.consolidate());
    console.log(obj.injected.getCTM());
    obj.injected.classList.add(this._mine('g'));
    obj._initInjected();
    const bb2 = obj.getBoundingBox();
    this.scene._showRect(bb2);
    obj._scripts(this.jscode);
  }

  inject(x, y) {
    x = _def(x, 0);
    y = _def(y, 0);
    if (this.injected === null) {
      this._shadow();
      this.injected = this.parent.appendChild(this.obj);
      this.injected.classList.add(this._mine('g'));
      this._initInjected();
    }
    this.setPos(x, y);
    this.lastPos = [x, y];
    this.cpos = [x, y];
    this._scripts(this.jscode);
    if (this.scene instanceof scene) {
      this.scene._add(this);
    }
  }
  _scripts(sc) {
    let sid = 'script' + this.uid;
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.id = sid;
      s.innerHTML = sc;
      document.body.appendChild(s);
    }
  }
  _styles(sc) {
    if (sc === null) return;
    let sid = 'style' + sc.replace(/\./g, '_');
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement('link');
      (s.rel = 'stylesheet'), (s.type = 'text/css');
      s.id = sid;
      s.innerHTML = sc;
      document.head.appendChild(s);
    }
  }

  _innerjs() {
    let of =
      /function[\s\n\r]+[^\s\n\r]*[\s\n\r]*\([^\)]*\)[\s\n\r]*\{(.+)\}/ms;
    let oc = of.exec(this.jscode);
    if (_ex(oc)) {
      if (oc.length > 1) {
        oc.shift();
        this.jscode = oc[0];
      }
    }
  }
  _shadow() {
    this.obj.innerHTML = this.obj.innerHTML
      .replace(
        /(id\s*=\s*[\"\'])([^\"\']+)([\"\'])/g,
        '$1' + '$2' + this.uid + '$3'
      )
      .replace(/local\(([^\)]+)\)/g, '$1' + this.uid);
    this.style = this.style.replace(
      /(#)([^\{]+)\s*(\{)/g,
      '$1' + '$2' + this.uid + '$3'
    );
    this._innerjs();
    this._convertVars();
    this._convertFuncts();
    this._convertLocals();
  }

  _convertLocals() {
    this.jscode = this.jscode.replace(/local\(([^\)]+)\)/g, '$1' + this.uid);
  }

  _convertVars() {
    const re1 = /(?:let|var|const)\s+([^\s]+)\s*[=;$]/gi;
    const bef = '([^\\w\\d\\_])(';
    const aft = ')([^\\w\\_\\d])';
    this._convert(re1, bef, aft);
  }

  _convertFuncts() {
    const re1 = /function\s+([^\s]+)\s*\(/gi;
    const bef = '([^\\w\\d\\_])(';
    const aft = ')(\\s*\\()';
    this._convert(re1, bef, aft);
  }

  _convert(re, bef, aft) {
    const strng = this.jscode;
    let jsvars = [];
    let m;
    do {
      m = re.exec(strng);
      if (m) {
        m.shift();
        jsvars.push(m[0]);
      }
    } while (m);
    for (let i in jsvars) {
      let v = jsvars[i];
      const repl = new RegExp(bef + v + aft, 'g');
      this.jscode = this.jscode.replace(repl, '$1$2' + this.uid + '$3');
    }
  }
}

nextModule();
