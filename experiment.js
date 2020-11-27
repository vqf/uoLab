let scr = document.getElementById("screen");
let sc = new scene(scr);
sc._showGrid();
sc._showBox(2, 2);
let pipette1 = new pipette(scr);
pipette1.scale(2, 2);
pipette1.inject(100, 100);

let tips = [];
for (let i = 0; i < 20; i++) {
  let newtip = new yellowTip(scr);
  tips.push(newtip);
  newtip.scale(2, 2);
  newtip.inject(i * 5, 100);
}

if (DEBUG > 0) console.log("Experiment loaded");
