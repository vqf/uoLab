function _uid() {
  let l = 10;
  let result = "";
  let letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p"
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
  var result = "";
  for (var i = 0; i < arguments.length; i++) {
    var r = arguments[i];
    if (typeof r !== "undefined" && r !== "") {
      return r;
    }
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
    this.parent = _def(parent, document);
    this.obj = _def(obj);
    this.jscode = _def(jscode);
    this.style = _def(style);
    this.pos = this.parent.createSVGTransform();
    this.resize = this.parent.createSVGTransform();
    this.pt = this.parent.createSVGPoint();
    this.uid = _uid();
    this.moveAnim = loadSVGTag({
      tag: "animateTransform",
      attributeName: "transform",
      type: "translate",
      dur: "2s"
    });
    this.rotateAnim = loadSVGTag({
      tag: "animateTransform",
      attributeName: "transform",
      type: "rotate",
      dur: "2s"
    });
    this.date = new Date();
    this.drag = this._dragData();
  }

  _dragData() {
    let result = {
      isDragging: false,
      from: {
        x: 0,
        y: 0
      },
      time: this.date.getTime(),
      dt: "0.5s",
      dtms = 5000,
      dragEvents: {
        mousedown: null,
        mouseup: null,
        mousemove: null
      }
    };
    return result;
  }

  getElementByLocalId(lid) {
    let id = lid + this.uid;
    let result = document.getElementById(id);
    return result;
  }

  setPos(x, y) {
    this.pos.setTranslate(x, y);
  }

  rotate(angle, dur) {
    if (typeof dur !== undefined && dur !== undefined) {
      this.rotateAnim.setAttribute("dur", dur);
    }
    this.rotateAnim.setAttribute("by", angle);
  }

  move(dx, dy, dur) {
    if (typeof dur !== undefined && dur !== undefined) {
      this.moveAnim.setAttribute("dur", dur);
    }
    this.moveAnim.setAttribute("by", dx + ", " + dy);
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
    if (typeof evt.touches !== "undefined" && evt.touches.length > 0) {
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
    this.drag.from.x = pt[0];
    this.drag.from.y = pt[1];
    this.drag.time = this.drag.date.getTime();
  }

  _drag(e) {
    const pt = this._actOnMouse(e);
    const dx = pt[0] - this.drag.from.x;
    const dy = pt[1] - this.drag.from.y;
    this.move(dx, dy, this.drag.dt);
    this.drag.from.x = pt[0];
    this.drag.from.y = pt[1];
  }

  makeDraggable(obj) {
    let myself = this;
    this.drag.dragEvents.mousedown = obj.addEventListener("mousedown", function(
      e
    ) {
      myself._startDrag(e);
    });
    this.drag.dragEvents.mousemove = obj.addEventListener("mousemove", function(
      e
    ) {
      let dt = this.drag.date.getTime() - this.drag.time;
      debugger;
      if (myself.drag.isDragging === true && dt >= this.drag.dtms) {
        myself._drag(e);
        this.drag.time = this.drag.date.getTime();
      }
    });
    this.drag.dragEvents.mouseup = obj.addEventListener("mouseup", function(e) {
      if (this.drag.isDragging === true) {
        myself.drag.isDragging = false;
      }
    });
  }

  _initInjected() {
    this.injected.transform.baseVal.appendItem(this.pos);
    this.injected.transform.baseVal.appendItem(this.resize);
    this.injected.appendChild(this.moveAnim);
    this.injected.appendChild(this.rotateAnim);
  }

  inject(x, y) {
    x = _def(x);
    y = _def(y);
    this._shadow();
    this.injected = this.parent.appendChild(this.obj);
    this._initInjected();
    this.setPos(x, y);
    this._scripts(this.jscode);
  }
  _scripts(sc) {
    let sid = "script" + this.uid;
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement("script");
      s.type = "text/javascript";
      s.id = sid;
      s.innerHTML = sc;
      document.body.appendChild(s);
    }
  }
  _styles(sc) {
    let sid = "style" + sc.replace(/\./g, "_");
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement("link");
      (s.rel = "stylesheet"), (s.type = "text/css");
      s.id = sid;
      s.innerHTML = sc;
      document.head.appendChild(s);
    }
  }
  _shadow() {
    this.obj.innerHTML = this.obj.innerHTML.replace(
      /(id\s*=\s*[\"\'])([^\"\']+)([\"\'])/g,
      "$1" + "$2" + this.uid + "$3"
    );
    this.style = this.style.replace(
      /(#)([^\{]+)\s*(\{)/g,
      "$1" + "$2" + this.uid + "$3"
    );
    this._convertVars();
    this._convertFuncts();
    this._convertLocals();
  }

  _convertLocals() {
    this.jscode = this.jscode.replace(/local\(([^\)]+)\)/g, "$1" + this.uid);
  }

  _convertVars() {
    const re1 = /(?:let|var|const)\s+([^\s]+)\s*[=;$]/gi;
    const bef = "([^\\w\\d\\_])(";
    const aft = ")([^\\w\\_\\d])";
    this._convert(re1, bef, aft);
  }

  _convertFuncts() {
    const re1 = /function\s+([^\s]+)\s*\(/gi;
    const bef = "([^\\w\\d\\_])(";
    const aft = ")(\\s*\\()";
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
      const repl = new RegExp(bef + v + aft, "g");
      this.jscode = this.jscode.replace(repl, "$1$2" + this.uid + "$3");
    }
  }
}

if (DEBUG > 0) console.log("Plugger loaded");
