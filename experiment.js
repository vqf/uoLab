let t = loadSVGTag(pipette);

document.getElementById("screen").appendChild(t);

let tmp = new plugger(
  document.getElementById("screen"),
  '<div id="yo">t</div>'
);
tmp._shadow();

if (DEBUG > 0) console.log("Experiment loaded");
