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

loadDependencies(["pipette.js"]);
