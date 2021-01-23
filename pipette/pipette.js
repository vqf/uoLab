let pipette_code = {
  tag: "g",
  class: "pipette",
  content: [
    {
      tag: "path",
      class: "pipette_tipholder",
      id: "pipette_tipholder",
      d:
        "m 12.287303,78.916993 c 0,0 0,2.90619 0,2.90619 0,0 0.88869,0 0.88869,0 0,0 0,-2.90619 0,-2.90619 0,0 -0.88869,0 -0.88869,0"
    },
    {
      tag: "g",
      class: "pipette_plunger",
      id: "pipette_plunger",
      content: [
        {
          tag: "path",
          class: "pipette_top",
          d:
            "M 8.4596528,0.69659267 C 9.4914095,0.56346934 10.523462,0.43030784 11.555184,0.43034148 c 1.031721,3.363e-5 2.063252,0.13312786 3.095009,0.26625119 0,0 0,2.40748003 0,2.40748003 0,0 -1.48507,-0.23247 -1.48507,-0.23247 -0.554967,-0.075817 -1.109479,-0.1515713 -1.664641,-0.1516068 -0.555161,-3.54e-5 -1.110193,0.07579 -1.6651593,0.1516068 0,0 -1.3756699,0.23242 -1.3756699,0.23242 0,0 0,-2.40743003 0,-2.40743003 z"
        },
        {
          tag: "path",
          class: "pipette_piston",
          d:
            "m 9.8353227,2.8716027 c 0,0 0.004,5.16743 0.004,5.16743 0,0 3.4350903,0.56774 3.4350903,0.56774 0,0 -0.1094,-5.73517 -0.1094,-5.73517 -0.54977,-0.065657 -1.099315,-0.1312865 -1.654363,-0.1313034 -0.555048,-1.69e-5 -1.115267,0.065647 -1.6754273,0.1313034 0,0 1e-4,0 1e-4,0 z"
        }
      ]
    },
    {
      tag: "g",
      class: "pipette_unloader",
      id: "pipette_unloader",
      content: [
        {
          tag: "path",
          class: "pipette_release",
          d:
            "m 14.716153,14.653093 c 0,0 -0.0305,-5.7911103 -0.0305,-5.7911103 0,0 5.46721,0.77654 5.46721,0.77654 0,0 0.17196,1.2037203 0.17196,1.2037203 0,0 -2.75135,0 -2.75135,0 0,0 0.008,4.05469 0.008,4.05469 0,0 -2.86507,0 -2.86507,0 0,0 -2.5e-4,-0.24384 -2.5e-4,-0.24384 z"
        },
        {
          tag: "path",
          class: "pipette_rod",
          d:
            "m 9.4914128,46.411173 c 0,0 6.5344502,5e-5 6.5344502,5e-5 0,0 0.17196,4.32555 0.17196,4.32555 0,0 -2.235823,2.23547 -2.235823,2.23547 0,6.815137 0,13.630009 -0.09328,17.954122 -0.09328,4.324113 -0.279889,6.157515 -0.466472,7.990628 0,0 -1.38962,0 -1.38962,0 C 11.7586,77.08388 11.504538,75.250546 11.34228,70.926386 11.180022,66.602226 11.109512,59.787346 11.039,52.972193 c 0,0 -1.3756273,-1.71959 -1.3756273,-1.71959 0,0 -0.1719599,-4.84143 -0.1719599,-4.84143"
        }
      ]
    },
    {
      tag: "path",
      id: "pipette_body",
      class: "pipette_body",
      d:
        "m 13.274523,8.6067727 c 0,0 1.41115,0.25521 1.41115,0.25521 0,0 0.0304,6.0349503 0.0304,6.0349503 0,0 2.86508,0 2.86508,0 0,0 -0.008,-0.61551 -0.008,-0.61551 0,0 1.03176,0 1.03176,0 0,0 -0.17196,31.81245 -0.17196,31.81245 0,0 -2.40743,1.37568 -2.40743,1.37568 0,0 -6.5344502,-5e-5 -6.5344502,-5e-5 0,0 -1.37568,-0.51588 -1.37568,-0.51588 C 8.0007561,40.017933 7.8861152,33.081987 7.8001386,27.063506 7.714162,21.045025 7.6568428,15.943646 7.5995228,10.842193 6.7970471,10.383636 5.9946581,9.925129 5.1922544,9.8390828 4.3898508,9.7530367 3.5874594,10.039603 2.7847976,10.584223 1.9821358,11.128843 1.1799758,11.931003 0.69258205,12.217675 0.20518827,12.504346 0.03328467,12.275141 0.34859204,11.61594 0.66389941,10.956739 1.4665288,9.8674581 2.354904,9.093777 3.2432791,8.320096 4.2179776,7.8614128 5.2208532,7.7181778 c 1.0028756,-0.143235 2.0349603,0.02878 2.8087314,0.1434095 0.7737711,0.1146291 1.2897565,0.1719608 1.5475823,0.2006081 0.2578258,0.028647 0.2578258,0.028647 0.2578258,0.028647 0,0 3.4395303,0.51593 3.4395303,0.51593 z"
    } /*,
    {
      tag: "path",
      id: "tip",
      class: "yellow_tip invis",
      d:
        "m 13.325755,83.450429 c 0.126663,-2.206485 0.253271,-3.185743 0.379918,-4.165296 -0.316623,0.02967 -0.632961,0.05931 -0.949756,0.05932 -0.316795,1.1e-5 -0.633361,-0.02965 -0.949984,-0.05932 0.12665,0.979553 0.253242,1.958659 0.379931,4.165614 0.126688,2.206956 0.253319,5.639813 0.379969,9.073196 0,0 0.37995,0 0.37995,0 0.12665,-3.433383 0.25331,-6.867029 0.379972,-9.073514 z"
    }*/
  ]
};

let yellow_tip = {
  tag: "g",
  class: "yt",
  content: {
    tag: "path",
    id: "ytip",
    class: "yellow_tip",
    d:
      "m 13.325755,89.800433 c 0.126663,-2.206485 0.253271,-3.185743 0.379918,-4.165296 -0.316623,0.02967 -0.632961,0.05931 -0.949756,0.05932 -0.316795,1.1e-5 -0.633361,-0.02965 -0.949984,-0.05932 0.12665,0.979553 0.253242,1.958659 0.379931,4.165614 0.126688,2.206956 0.253319,5.639813 0.379969,9.073196 0,0 0.37995,0 0.37995,0 0.12665,-3.433383 0.25331,-6.867029 0.379972,-9.073514 z"
  }
};

function pipette_behavior() {}
function tip_behavior() {}

class pipette extends plugger {
  constructor(parent, x, y) {
    let mp = loadSVGTag(pipette_code);
    super(parent, mp, pipette_behavior);
    this.setPos(x, y);
    this.scaleCorrection = 2;
    this.state.plunger = "released";
    this.state.tip = "unloaded";
  }
  inject(x, y) {
    super.inject(x, y);
    let bod = this.getElementByLocalId("pipette_body");
    this.makeDraggable(bod);
  }
  getMessage(msg, sender) {
    let from = _def(sender, null);
    if (msg === "hasMoved") {
      let myself = this;
      this.scene._clearObjectGrid(myself);
      this.scene._calcSpace(myself);
      let closest = this.scene.closest(myself, 2, "pipette_tipholder");
      if (closest === null) {
        if (this.closest !== null) {
          this.closest.getMessage("left", myself);
        }
      } else {
        closest.getMessage("closest", myself);
        if (this.closest !== null && this.closest._uid() !== closest._uid()) {
          this.closest.getMessage("left", myself);
        }
      }
      this.closest = closest;
    } else {
      super.getMessage(msg);
      if (msg === "mouseUp") {
        if (this.closest !== null) {
          if (this.state.tip === "unloaded" && this.closest instanceof tip) {
            this.loadTip();
          }
        }
      }
    }
  }
  loadTip() {
    const tp = this.closest;
    if (tp instanceof tip) {
      let uid = tp._uid();
      this.state.noClash[uid] = tp;
      const bbtip = tp.getBoundingBox();
      const bbself = this.getBoundingBox("pipette_tipholder");
      const tipx = bbtip.x + bbtip.width / 2;
      const tipy = bbtip.y;
      const fy = bbself.height;
      const destx = tipx - bbself.x - bbself.width / 2;
      const desty = tipy - bbself.y - bbself.height;
      this.move(destx, desty, 0.5)
        .then()
        .move(0, fy, 0.2);
    }
  }
  _initInjected() {
    super._initInjected();
    this.addEventListener(
      "click",
      function(e, myself) {
        myself.touchPlunger(e);
      },
      "pipette_plunger"
    );
    this.addEventListener(
      "click",
      function(e, myself) {
        myself.releaseTip(e);
      },
      "pipette_unloader"
    );
  }
  touchPlunger(e) {
    const tp = this.getElementByLocalId("pipette_plunger");
    toggleClass(tp, "depressed_plunger");
    if (this.state.plunger === "released") {
      this.state.plunger = "pressed";
      this.getMessage("pressPlunger");
    } else {
      this.state.plunger = "released";
      this.getMessage("releasePlunger");
    }
  }
  releaseTip(e) {
    this.getMessage("releaseTip");
  }
}

class tip extends plugger {}

class yellowTip extends tip {
  constructor(parent) {
    let tp = loadSVGTag(yellow_tip);
    super(parent, tp, tip_behavior);
    this.scaleCorrection = 2;
  }
  inject(x, y) {
    super.inject(x, y);
    let bod = this.getElementByLocalId("ytip");
    this.makeDraggable(bod);
  }
  getMessage(msg, sender) {
    let from = _def(sender, null);
    let fromPipette = from instanceof pipette;
    super.getMessage(msg);
    if (fromPipette === true && msg === "closest") {
      this.highlightOn();
    }
    if (fromPipette === true && msg === "left") {
      this.highlightOff();
    }
  }
}
