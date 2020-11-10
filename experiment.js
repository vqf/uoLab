let t = loadSVGTag(pipette);

//document.getElementById("screen").appendChild(t);

let tmp = new plugger(document.getElementById("screen"), t, pipette_behavior);
tmp.inject();

if (DEBUG > 0) console.log("Experiment loaded");
