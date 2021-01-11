let DEBUG_GRID = false;
let DEBUG_PROXIMITY = false;

function inRange(v, min, max) {
  let result = v;
  if (v < min) {
    result = min;
  }
  if (v > max) {
    result = max;
  }
  return result;
}

class scene {
  constructor(svg) {
    this.svg = svg;
    this.lognBoxes = 6; // 64 boxes
    this.nboxes = 1 << this.lognBoxes;
    this.objects = [];
    this.localizers = {};
    this.squares = {};
    this._startGrid();
    let myself = this;
    this._initBoxes();
    this._initTranslator();
    let f = this._initBoxes;
    let onthefly = function(evt) {
      f(myself);
    };
    window.addEventListener("resize", onthefly);
  }

  _startGrid() {
    this.grid = [];
    for (let i = 0; i <= this.nboxes; i++) {
      this.grid[i] = [];
    }
    for (let i = 0; i <= this.nboxes; i++) {
      for (let j = 0; j <= this.nboxes; j++) {
        this.grid[i][j] = {};
      }
    }
  }
  _add(obj) {
    this.objects.push(obj);
    let uid = obj._uid();
    this.localizers[uid] = obj;
    this.squares[uid] = [];
    this._calcSpace(obj);
  }

  _clearObjectGrid(obj) {
    let uid = obj._uid();
    this.squares[uid].forEach(p => {
      if (typeof this.grid[p[0]][p[1]][uid] !== undefined) {
        delete this.grid[p[0]][p[1]][uid];
      }
      if (DEBUG_GRID === true) {
        this._hideBox(p[0], p[1]);
      }
    });
    this.squares[uid] = [];
  }

  _getBoxes(bb, sur) {
    let result = [];
    result.nstx = inRange(Math.floor(bb.x / this.box.x) - sur, 0, this.nboxes);
    result.nndx = inRange(
      Math.floor((bb.x + bb.width) / this.box.x) + sur,
      0,
      this.nboxes
    );
    result.nsty = inRange(Math.floor(bb.y / this.box.y) - sur, 0, this.nboxes);
    result.nndy = inRange(
      Math.floor((bb.y + bb.height) / this.box.y) + sur,
      0,
      this.nboxes
    );
    return result;
  }

  _calcSpace(obj) {
    let bb = obj.getBoundingBox();
    let uid = obj._uid();
    let boxes = this._getBoxes(bb, 0);
    for (let i = boxes.nstx; i <= boxes.nndx; i++) {
      for (let j = boxes.nsty; j <= boxes.nndy; j++) {
        this.squares[uid].push([i, j]);
        this.grid[i][j][uid] = true;
        if (DEBUG_GRID === true) {
          this._showBox(i, j);
        }
      }
    }
  }

  add(object_name, x, y) {
    let obj = this.sceneObjects[object_name](x, y);
    obj.inject(x, y);
    this._add(obj);
    return obj;
  }

  _getFromGrid(b, puid) {
    let o = [];
    let stx = inRange(b.nstx, 0, this.nboxes);
    let ndx = inRange(b.nndx, 0, this.nboxes);
    let sty = inRange(b.nsty, 0, this.nboxes);
    let ndy = inRange(b.nndy, 0, this.nboxes);
    for (let i = stx; i <= ndx; i++) {
      for (let j = sty; j <= ndy; j++) {
        let k = Object.keys(this.grid[i][j]);
        if (k.length > 0) {
          k.forEach(x => {
            if (x !== puid) {
              o[x] = true;
            }
          });
        }
      }
    }
    return o;
  }

  closest(obj, surround, partid) {
    let sur = _def(surround, 1);
    let puid = obj._uid();
    let result = null;
    let bbox = obj.getBoundingBox();
    if (typeof partid !== "undefined") {
      let uid = document.getElementById(partid + obj._uid());
      bbox = uid.getBoundingClientRect();
    }
    let b = this._getBoxes(bbox, sur);
    let o = this._getFromGrid(b, puid);
    let uids = Object.keys(o);
    if (uids.length > 0) {
      let cx = bbox.x + bbox.width / 2;
      let cy = bbox.y + bbox.height / 2;
      let d = -1;
      uids.forEach(u => {
        let j = this.localizers[u];
        let cbox = j.getBoundingBox();
        let icx = cbox.x + cbox.width / 2;
        let icy = cbox.y + cbox.height / 2;
        let dx = cx - icx;
        let dy = cy - icy;
        let did = Math.sqrt(dx * dx + dy * dy);
        if (d < 0 || did < d) {
          d = did;
          result = j;
          //Check clash
        }
      });
      if (DEBUG_PROXIMITY === true) {
        this._showPoint(cx, cy, "obj1");
        let cbox = result.getBoundingBox();
        let icx = cbox.x + cbox.width / 2;
        let icy = cbox.y + cbox.height / 2;
        this._showPoint(icx, icy, "obj2");
      }
    }
    return result;
  }

  _initTranslator() {
    let myself = this;
    this.sceneObjects = {
      pipette: function(x, y) {
        return new pipette(myself, x, y);
      },
      tip: function(x, y) {
        return new tip(myself, x, y);
      },
      tube: function(x, y) {
        return new tube(myself, x, y);
      }
    };
  }

  _initBoxes(meself) {
    let myself = _def(this, meself);
    myself.w = myself.svg.getBoundingClientRect().width;
    myself.h = myself.svg.getBoundingClientRect().height;
    let nboxes = myself.nboxes;
    myself.box = {
      x: myself.w / nboxes,
      y: myself.h / nboxes
    };
    if (DEBUG_GRID === true) {
      myself._hideGrid();
      myself._showGrid();
    }
  }
  getSvg() {
    return this.svg;
  }

  /* DEBUG */
  _showBox(nx, ny) {
    let x0 = nx * this.box.x;
    let y0 = ny * this.box.y;
    let uid = "r_" + nx + "_" + ny;
    let r = loadSVGTag({
      id: uid,
      tag: "rect",
      class: "debugBox",
      x: x0,
      y: y0,
      width: this.box.x,
      height: this.box.y
    });
    this.svg.insertBefore(r, this.svg.firstChild);
  }

  _hideBox(nx, ny) {
    let uid = "r_" + nx + "_" + ny;
    let g = document.getElementById(uid);
    if (g !== null) {
      g.parentElement.removeChild(g);
    }
  }

  _hideGrid() {
    let g = document.getElementById("grid");
    if (g !== null) {
      g.parentElement.removeChild(g);
    }
  }
  _showGrid() {
    let grd = {
      tag: "g",
      id: "grid",
      content: []
    };
    for (let i = 0; i < this.w; i += this.box.x) {
      let l = {
        tag: "line",
        class: "grid",
        x1: i,
        y1: 0,
        x2: i,
        y2: this.h
      };
      grd.content.push(l);
    }
    for (let i = 0; i < this.h; i += this.box.y) {
      let l = {
        tag: "line",
        class: "grid",
        x1: 0,
        y1: i,
        x2: this.w,
        y2: i
      };
      grd.content.push(l);
    }
    this.svg.appendChild(loadSVGTag(grd));
  }
  _showPoint(x, y, id) {
    let c = document.getElementById(id);
    if (c === null) {
      let p = {
        tag: "circle",
        class: "debugCircle",
        id: id,
        cx: x,
        cy: y,
        r: 5
      };
      this.svg.appendChild(loadSVGTag(p));
    } else {
      c.setAttribute("cx", x);
      c.setAttribute("cy", y);
    }
  }
}
