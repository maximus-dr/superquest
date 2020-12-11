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
    this.broadcast(this.state);
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  broadcast(state) {
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  update(prop) {
    this.state = Object.assign(this._state, prop);
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

  tick() {
    this.update({time: this.state.time + 1});
  }

  die() {
    this.update({lives: this.state.lives - 1});
  }
}
