
export class Params {
  constructor(private _data = {}) {}

  at(key: string): any {
    return this._data[key];
  }

  get data(): Object {
    return this._data;
  }
}

