let DEBUG = 0;

let logger = new Event("log");
document.addEventListener("log", function(e) {
  console.log(e.custom);
});

function loadDependencies(scs) {
  scs.forEach(sc => {
    logger.custom = sc;
    document.dispatchEvent(logger);
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
    let sid = "ld" + sc.replace(/[^\w\d\-\_]/g, "_");
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

loadDependencies([
  "asyncanim.js",
  "plugger.js",
  "loadTag.js",
  "pipette/pipette.js",
  "experiment.js"
]);
loadStyles(["pipette/pipette.css"]);

if (DEBUG > 0) console.log("Master loaded");
