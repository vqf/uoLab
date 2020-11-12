let scr = document.getElementById("screen");
let pipette1 = new pipette(scr);
pipette1.inject(100, 100);

pipette1.setPos(100, 200);

if (DEBUG > 0) console.log("Experiment loaded");
