let scr = document.getElementById("screen");
let sc = new scene(scr);
//sc._showGrid();
//sc._showBox(2, 2);
let pipette1 = new pipette(sc);
pipette1.scale(2, 2);
pipette1.inject(100, 100);

let pipette2 = sc.add("pipette", 300, 100);
let tips = [];
for (let i = 0; i < 1; i++) {
  let newtip = new yellowTip(sc);
  tips.push(newtip);
  newtip.inject(i * 10 + 200, 100);
}

let epp = new tube(sc);
epp.inject(100, 300);
/*tips.forEach((o, i) => {
  o.rotate(45 + 10 * i, 1)
    .then()
    .rotate(-45 - 10 * i, 1);

  o.move(100 + 10 * i, 0, 2)
    .then()
    .move(-50 - 10 * i, 0, 1);
});*/
if (DEBUG > 0) console.log("Experiment loaded");

//epp.addEventListener("click", flip);

/*function flip(e, obj) {
  obj.then().rotate(360, 2);
}*/
