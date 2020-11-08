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
  constructor(parent, code, jscode, style) {
    this.parent = _def(parent, document);
    this.code = _def(code);
    this.jscode = _def(jscode);
    this.style = _def(style);
    this.uid = _uid();
  }
  _shadow() {
    this.code = this.code.replace(
      /(id=[\"\'])([^\"\']+)([\"\'])/,
      "$1" + "$2" + this.uid + "$3"
    );
    console.log(this.code);
  }
}

if (DEBUG > 0) console.log("Plugger loaded");
