class scene {
  constructor(svg) {
    this.svg = svg;
    this.lognBoxes = 6; // 64 boxes
    this.w = svg.getBoundingClientRect().width;
    this.h = svg.getBoundingClientRect().height;
    let nboxes = 1 << this.lognBoxes;
    this.box = {
      x: this.w / nboxes,
      y: this.h / nboxes
    };
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
  _showGrid() {
    for (let i = 0; i < this.w; i += this.box.x) {
      let l = loadSVGTag({
        tag: "line",
        class: "grid",
        x1: i,
        y1: 0,
        x2: i,
        y2: this.h
      });
      this.svg.appendChild(l);
    }
    for (let i = 0; i < this.h; i += this.box.y) {
      let l = loadSVGTag({
        tag: "line",
        class: "grid",
        x1: 0,
        y1: i,
        x2: this.w,
        y2: i
      });
      this.svg.appendChild(l);
    }
  }
}
