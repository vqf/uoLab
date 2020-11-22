class animateme {
  constructor() {
    this.objectList = [];
    this.animList = [];
  }

  _isNewObject(obj) {
    let result = true;
    for (let i in this.objectList) {
      let o = this.objectList[i];
      if (Object.is(o, obj)) {
        result = false;
      }
    }
    return result;
  }

  addObject(obj) {
    if (this._isNewObject(obj)) {
      this.objectList.push(obj);
    }
  }
}
