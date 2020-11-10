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

class plugger {
  constructor(parent, obj, jscode, style) {
    this.parent = _def(parent, document);
    this.obj = _def(obj);
    this.jscode = _def(jscode);
    this.style = _def(style);
    this.uid = _uid();
  }

  inject() {
    this.parent.appendChild(this.obj);
    this._scripts(this.jscode);
  }
  _scripts(sc) {
    let sid = "ld" + this.uid;
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement("script");
      s.type = "text/javascript";
      s.id = sid;
      s.src = sc;
      document.body.appendChild(s);
    }
  }
  _styles(scs) {
    scs.forEach(sc => {
      let sid = "ld" + sc.replace(/\./g, "_");
      let s = document.getElementById(sid);
      if (s === null) {
        s = document.createElement("link");
        (s.rel = "stylesheet"), (s.type = "text/css");
        s.id = sid;
        s.href = sc;
        document.head.appendChild(s);
      }
    });
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
    this.jscode.replace(/local\(([^\)]+)\)/, "$1" + this.uid);
  }

  _convertVars() {
    const re1 = /(?:let|var|const)\s+([^\s]+)\s*[=;$]/gi;
    const bef = "([^\\w\\d\\_])(";
    const aft = ")([^\\w\\_\\d])";
    this._convert(re1, bef, aft);
  }

  _convertFuncts() {
    const re1 = /function\s+([^\s]+)\s*\(/gi;
    const bef = "([;\\s^])(";
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
