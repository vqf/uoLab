let t = loadSVGTag(pipette);

document.getElementById("screen").appendChild(t);

let tmp = new plugger(
  document.getElementById("screen"),
  '<div id="yo">t</div><span id="tu">ds</span>',
  `function _def() {
  var result = ""; let d = 9;
  for (var i = 0; i < arguments.length; i++) {
    var r = arguments[i];
    if (typeof r !== "undefined" && r !== "") {
      return r;
    }
  }
  return result;
}`
);
//tmp._shadow();

if (DEBUG > 0) console.log("Experiment loaded");
