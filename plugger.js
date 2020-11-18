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

function getChildById(parent, id) {
  let ndes = parent.childNodes;
  let result = null;
  for (let i = 0; i < ndes.length; i++) {
    let t = ndes.item(i);
    if (t.id === id) {
      result = t;
    }
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
    this.drag = {};
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

  _startDrag(e) {
    console.log(e);
  }

  makeDraggable(obj) {
    obj.addEventlistener("mousedown", function(e) {
      this._startDrag(e);
    });
  }

  _initInjected() {
    this.injected.transform.baseVal.appendItem(this.pos);
    this.injected.transform.baseVal.appendItem(this.resize);
    this.injected.appendChild(this.moveAnim);
    this.injected.appendChild(this.rotateAnim);
  }

  inject(x, y) {
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
