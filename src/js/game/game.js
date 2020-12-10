import {Store} from "./store";
import Header from './../components/header';
import Level from './../components/level';
import {levels} from "../data/data";


const INITIAL_STATE = Object.freeze({
  level: 'level-0',
  lives: 3,
  time: 0
});

export class Game {
  init() {
    this.store = new Store(INITIAL_STATE);
    this.header = new Header(this.store.state);

    const currentLevel = levels[this.store.state.level];
    this.level = new Level(currentLevel);

    this.render(this.header.element);
    this.render(this.level.element);

    this.store.subscribe(this.updateLevel);

  }

  updateLevel(state) {
    const levelField = document.querySelector('.header__level-field');
    levelField.innerHTML = state.level;
  }

  tick() {
    this.store.update({time: this.store.state.time + 1});
  }

  startTimer() {
    this.store._timerId = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this.store._timerId);
  }

  render(component) {
    const app = document.querySelector('.app');
    app.append(component);
  }
}

export const game = new Game();
