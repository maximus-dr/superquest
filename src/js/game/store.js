import {levels} from './../data/data';


export class Store {

  constructor(state) {
    this._state = {...state};
    this.levels = levels;
    this.listeners = new Set();
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = {...newState};
    this.broadcast();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  broadcast() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  update(param) {
    this.state = Object.assign(this._state, param);
  }

  getLevel(level) {
    return this.levels[level];
  }

  changeLevel(level) {
    const hasLevel = this.getLevel(level);

    if (hasLevel) {
      this.update({level});
    } else {
      throw new Error(`${level} not found`);
    }
  }
}
