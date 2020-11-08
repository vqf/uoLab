function _uid() {
  let l = 10;
  let result = "";
  let letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p"
  ];
  for (let i = 0; i < l; i++) {
    let tl = 0;
    for (let j = 0; j < 4; j++) {
      tl = tl << 1;
      let r = Math.random();
      if (r > 0.5) {
        tl++;
      }
    }
    result += letters[tl];
  }
  return result;
}

function loadDependencies(scs) {
  scs.forEach(sc => {
    let sid = "ld" + sc.replace(/\./g, "_");
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement("script");
      s.type = "text/javascript";
      s.id = sid;
      s.src = sc;
      document.head.appendChild(s);
    }
  });
}

function loadStyles(scs) {
  scs.forEach(sc => {
    let sid = "ld" + sc.replace(/\./g, "_");
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement("link");
      (s.rel = "stylesheet"), (s.type = "text/css");
      s.id = sid;
      s.href = sc;
      document.head.appendChild(s);
    }
  });
}

loadDependencies(["loadTag.js", "pipette.js", "experiment.js"]);
loadStyles(["pipette.css"]);
