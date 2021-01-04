let DEBUG_GRID = true;
class scene {
  constructor(svg) {
    this.svg = svg;
    this.lognBoxes = 6; // 64 boxes
    this.nboxes = 1 << this.lognBoxes;
    this.objects = [];
    this.localizers = {};
    let myself = this;
    this._initBoxes(myself);
    this._initTranslator();
    let f = this._initBoxes;
    let onthefly = function(evt) {
      f(myself);
    };
    window.addEventListener("resize", onthefly);
  }

  _add(obj) {
    this.objects.push(obj);
    this.localizers[obj._uid()] = obj;
    this._calcSpace(obj);
  }

  _calcSpace(obj) {
    let bb = obj.getBoundingBox();
    let nstx = Math.floor(bb.x / this.box.x);
    let nndx = Math.floor((bb.x + bb.width) / this.box.x);
    let nsty = Math.floor(bb.y / this.box.y);
    let nndy = Math.floor((bb.y + bb.height) / this.box.y);
    for (let i = nstx; i <= nndx; i++) {
      for (let j = nsty; j <= nndy; j++) {
        this._showBox(i, j);
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

  _initBoxes(myself) {
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
    let y0 = nx * this.box.y;
    let r = loadSVGTag({
      tag: "rect",
      class: "debugBox",
      x: x0,
      y: y0,
      width: this.box.x,
      height: this.box.y
    });
    this.svg.insertBefore(r, this.svg.firstChild);
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
