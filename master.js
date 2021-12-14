let DEBUG = 0;

class trace {
  constructor() {
    this.msgs = [];
    this.counter = 0;
    this.trace = false;
  }
  log(msg) {
    this.msgs.push(msg);
    if (this.trace) {
      console.log(this.msgs[this.counter]);
      this.counter++;
    }
  }
}

let logger = new Event('log');
let uolog = [];
document.addEventListener('load', function (e) {
  uolog.push(e.custom);
});

function uoLog(msg) {
  logger.custom = msg;
  document.dispatchEvent(logger);
}
function printUoLog() {
  console.log(uolog);
}

function loadDependencies(scs) {
  let result = null;
  if (scs.length > 0) {
    const sc = scs.shift();
    uoLog(sc);
    let sid = 'ld' + sc.replace(/\./g, '_');
    let s = document.getElementById(sid);
    if (s === null) {
      result = new Promise(function (resolve, reject) {
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = sid;
        s.src = sc;
        s.addEventListener('load', function () {
          resolve(s.id);
        });
        s.addEventListener('error', function () {
          reject(s.id);
        });
        document.head.appendChild(s);
      })
        .then(loadDependencies(scs))
        .catch((error) => {
          console.log('Error while loading');
          console.error(error);
        });
    }
  }
  return result;
}

function loadStyles(scs) {
  scs.forEach((sc) => {
    let sid = 'ld' + sc.replace(/[^\w\d\-\_]/g, '_');
    let s = document.getElementById(sid);
    if (s === null) {
      s = document.createElement('link');
      (s.rel = 'stylesheet'), (s.type = 'text/css');
      s.id = sid;
      s.href = sc;
      document.head.appendChild(s);
    }
  });
}

loadDependencies([
  'scene.js',
  'anim.js',
  'plugger.js',
  'loadTag.js',
  'pipette/pipette.js',
  'tube/tube.js',
  'experiment.js',
]);
loadStyles(['pipette/pipette.css', 'tube/tube.css']);

if (DEBUG > 0) console.log('Master loaded');
