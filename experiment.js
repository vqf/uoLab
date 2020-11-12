let scr = document.getElementById("screen");
let pipette1 = new pipette(scr);
pipette1.inject(100, 100);

pipette1.plugger.move(100, -100, "5s");
pipette1.plugger.rotate(45);

if (DEBUG > 0) console.log("Experiment loaded");
