
export class Params {
  constructor(private _data = {}) {}

  at(key: string): any {
    return this._data[key];
  }

  get data(): any {
    return this._data;
  }
}

