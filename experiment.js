let scr = document.getElementById("screen");
let pipette1 = new pipette(scr);
pipette1.inject(100, 100);

pipette1.scale(2, 2);
pipette1.move(100, -100, "5s");

pipette1.rotate(45);

let pipette2 = new pipette(scr);
pipette2.inject(150, 100);
pipette2.scale(2, 2);
pipette2.rotate(-45);

let yt1 = new yellowTip(scr);
yt1.scale(2, 2);
yt1.inject(150, 100);

if (DEBUG > 0) console.log("Experiment loaded");
