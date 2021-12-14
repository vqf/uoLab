import { plugger } from '../plugger.js';

let tube_code = {
  tag: 'g',
  class: 'tube closedTube',
  content: [
    {
      tag: 'path',
      id: 'ctb',
      d: 'm 91.71429,114.9003798 c 2e-5,-1.10874 4.07456,-2.00755 9.10076,-2.00755 m -9.10076,2.00755 c -1e-5,1.10874 4.07454,2.00756 9.10076,2.00756 5.02622,0 9.10077,-0.89882 9.10076,-2.00756 -1e-5,-1.10874 -4.07456,-2.00755 -9.10076,-2.00755 0,0 -6.43673,0.18303 -9.65437,0.29692 -0.66958,0.0237 -2.39484,-0.001 -3.08267,0.10965 -0.68783,0.11087 0.24407,-2.66603 -0.35186,-2.97256 l -1.75502,-1.42554 c 0.32795,0.5153 -0.77308,4.09569 -0.30706,4.90857 0.46598,0.81289 1.55274,1.73629 2.03463,2.11132 1.60694,0.14469 4.74741,0.43487 4.74741,0.43487 v 34.43124 c 0,0 2.8399,17.20144 6.10559,25.20647 0.5261,1.28961 3.65162,1.2891 4.17752,0 3.26567,-8.00496 6.10561,-25.20647 6.10561,-25.20647 v -34.43124',
    },
    {
      tag: 'path',
      id: 'clid',
      d: 'm 88.1316,110.3608998 c 1.13172,0.33314 1.11148,1.68641 2.07265,2.3694 0.48812,0.34686 2.54199,-0.62009 2.8421,-0.10218 0.4833,0.83405 -1.02711,2.35171 -0.22332,2.88348 2.03389,1.3456 3.63767,1.37997 6.0667,1.59794 1.99945,0.17943 4.03748,-0.0879 6.0016,-0.5021 1.24233,-0.26196 2.7497,-0.47787 3.50054,-1.50159 0.57779,-0.78777 -0.90263,-2.18635 -0.25726,-2.9207 0.53539,-0.6092 1.58564,0.33794 2.37809,0.50649 0.43533,0.62488 0.87042,1.24948 1.30527,1.87379 0.80945,-0.74242 1.75739,-1.35925 2.42881,-2.22921 0.48637,-0.63018 1.04042,-1.38704 0.97467,-2.18068 -0.0872,-1.05256 -0.34957,-2.66857 -1.39102,-2.84735 -6.28894,-1.0796 -12.74599,-0.6286 -19.12507,-0.67546 -2.06022,-0.0151 -4.17773,-0.0668 -6.16179,0.4897 -0.48943,0.13728 -0.12887,1.19642 -0.59225,1.40452',
      content: [
        {
          tag: 'animateTransform',
          attributeName: 'transform',
          type: 'rotate',
          dur: '1s',
          id: 'openlid',
          begin: 'indefinite',
          fill: 'freeze',
          from: '0 88.1316 110.3608998',
          to: '-100 88.1316 110.3608998',
        },
        {
          tag: 'animateTransform',
          attributeName: 'transform',
          type: 'rotate',
          dur: '1s',
          id: 'closelid',
          begin: 'indefinite',
          fill: 'freeze',
          to: '0 88.1316 110.3608998',
          from: '-100 88.1316 110.3608998',
        },
      ],
    },
  ],
};

function tube_behavior() {
  let tb = document.getElementById('local(clid)');
  let state = 0;
  tb.addEventListener('click', function (e) {
    if (state === 0) {
      let an = document.getElementById('local(openlid)');
      an.beginElement();
      state = 1;
    } else {
      let an = document.getElementById('local(closelid)');
      an.beginElement();
      state = 0;
    }
  });
}

class tube extends plugger {
  constructor(parent) {
    let mp = loadSVGTag(tube_code);
    super(parent, mp, tube_behavior);
    this.scaleCorrection = 0.6;
  }
  inject(x, y) {
    super.inject(x, y);
    let bod = this.getElementByLocalId('ctb');
    this.makeDraggable(bod);
  }
}
