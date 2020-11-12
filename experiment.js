let scr = document.getElementById("screen");
let pipette1 = new pipette(scr);
pipette1.inject(100, 100);

pipette1.move(100, -100, "5s");
pipette1.rotate(45);

let pipette2 = new pipette(scr);
pipette2.inject(200, 100);
pipette2.rotate(-45);

if (DEBUG > 0) console.log("Experiment loaded");
