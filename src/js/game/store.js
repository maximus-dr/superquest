import {levels} from './../data/data';
import App from './../app';


export class Store {

  constructor(state) {
    this._state = {...state};
    this.currentLevel = this.getCurrentLevel();
    this.listeners = new Set();
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = {...newState};
    this.currentLevel = this.getCurrentLevel();
    this.broadcast(this.state);
  }

  update(prop) {
    this.state = Object.assign(this._state, prop);
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

  getCurrentLevel() {
    return levels[this.state.level];
  }

  changeLevel(level) {
    this.update({level});
  }

  next() {
    const next = this.currentLevel.next;
    if (next) {
      this.changeLevel(next);
    } else {
      throw new Error('No next level found');
    }
  }

  die() {
    this.update({lives: this.state.lives - 1});
    if (this.state.lives === 0) {
      App.gameOver();
    }
  }

  tick() {
    this.update({time: this.state.time + 1});
  }

  win() {
    App.showWin();
  }

  help() {
    App.showHelp();
  }
}
