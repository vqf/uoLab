class scene {
  constructor(svg) {
    this.svg = svg;
    this.lognBoxes = 6; // 64 boxes
    let myself = this;
    this._initBoxes(null, myself);
    let f = this._initBoxes;
    let onthefly = function(evt) {
      f(evt, myself);
    };
    window.addEventListener("resize", onthefly);
  }

  _initBoxes(evt, myself) {
    myself.w = myself.svg.getBoundingClientRect().width;
    myself.h = myself.svg.getBoundingClientRect().height;
    let nboxes = 1 << myself.lognBoxes;
    myself.box = {
      x: myself.w / nboxes,
      y: myself.h / nboxes
    };
    myself._hideGrid();
    myself._showGrid();
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
