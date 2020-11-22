let scr = document.getElementById("screen");
let pipette1 = new pipette(scr);
pipette1.scale(2, 2);
pipette1.inject(100, 100);

if (DEBUG > 0) console.log("Experiment loaded");
