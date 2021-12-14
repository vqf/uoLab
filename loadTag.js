export function _uid() {
  let l = 10;
  let result = '';
  let letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
  ];
  for (let i = 0; i < l; i++) {
    let tl = 0;
    for (let j = 0; j < 4; j++) {
      tl = tl << 1;
      let r = Math.random();
      if (r > 0.5) {
        tl++;
      }
    }
    result += letters[tl];
  }
  return result;
}

export function loadTag(dsc) {
  let result = null;
  if (typeof dsc === 'object') {
    if (dsc.hasOwnProperty('tag')) {
      let tag = dsc.tag;
      let sid = _uid();
      if (dsc.hasOwnProperty('id')) {
        sid = dsc.id;
      }
      result = document.getElementById(sid);
      if (result === null) {
        result = document.createElement(tag);
        Object.keys(dsc).forEach((k) => {
          if (k !== 'content' && k !== 'tag') {
            result[k] = dsc[k];
          } else if (k === 'content') {
            if (Array.isArray(dsc.content) === true) {
              dsc.content.forEach((el) => {
                result.appendChild(loadTag(el));
              });
            } else {
              result.appendChild(loadTag(dsc.content));
            }
          }
        });
      }
    }
  } else {
    // Not an object
    result = document.createTextNode(dsc);
  }
  return result;
}

export function loadSVGTag(dsc) {
  let result = null;
  if (typeof dsc === 'object') {
    if (dsc.hasOwnProperty('tag')) {
      let tag = dsc.tag;
      let sid = _uid();
      if (dsc.hasOwnProperty('id')) {
        sid = dsc.id;
      }
      result = document.getElementById(sid);
      if (result === null) {
        result = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.keys(dsc).forEach((k) => {
          if (k !== 'content' && k !== 'tag') {
            result.setAttribute(k, dsc[k]);
          } else if (k === 'content') {
            if (Array.isArray(dsc.content) === true) {
              dsc.content.forEach((el) => {
                result.appendChild(loadSVGTag(el));
              });
            } else {
              result.appendChild(loadSVGTag(dsc.content));
            }
          }
        });
      }
    }
  } else {
    // Not an object
    result = document.createTextNode(dsc);
  }
  return result;
}
