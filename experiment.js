let scr = document.getElementById("screen");
let pipette1 = new pipette(scr);
pipette1.inject();

if (DEBUG > 0) console.log("Experiment loaded");
