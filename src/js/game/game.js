
export class Game {

  constructor(state) {
    this._state = {...state};
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

  tick() {
    this.update({time: this.state.time + 1});
  }

  startTimer() {
    this._timerId = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this._timerId)
  }
}
