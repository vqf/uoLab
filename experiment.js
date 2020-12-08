let scr = document.getElementById("screen");
let sc = new scene(scr);
//sc._showGrid();
//sc._showBox(2, 2);
let pipette1 = new pipette(sc);
pipette1.inject(100, 100);
pipette1.scale(2, 2);

let tips = [];
for (let i = 0; i < 20; i++) {
  let newtip = new yellowTip(sc);
  tips.push(newtip);
  newtip.inject(i * 5, 100);
  newtip.scale(2, 2);
}

let epp = new tube(sc);
epp.inject(100, 150);
epp.move(100, 100, 2);
epp.rotate(45, 1);

if (DEBUG > 0) console.log("Experiment loaded");
