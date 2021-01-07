let DEBUG_GRID = true;
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

  _calcSpace(obj) {
    let bb = obj.getBoundingBox();
    let uid = obj._uid();
    let nstx = Math.floor(bb.x / this.box.x);
    let nndx = Math.floor((bb.x + bb.width) / this.box.x);
    let nsty = Math.floor(bb.y / this.box.y);
    let nndy = Math.floor((bb.y + bb.height) / this.box.y);
    if (nndx > this.nboxes) {
      nndx = this.nboxes;
    }
    if (nndy > this.nboxes) {
      nndy = this.nboxes;
    }
    for (let i = nstx; i <= nndx; i++) {
      for (let j = nsty; j <= nndy; j++) {
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

  _initBoxes() {
    this.w = this.svg.getBoundingClientRect().width;
    this.h = this.svg.getBoundingClientRect().height;
    let nboxes = this.nboxes;
    this.box = {
      x: this.w / nboxes,
      y: this.h / nboxes
    };
    if (DEBUG_GRID === true) {
      this._hideGrid();
      this._showGrid();
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
}
