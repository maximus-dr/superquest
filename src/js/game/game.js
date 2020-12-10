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
    this.updateLives(this.store.state);

    this.store.subscribe(this.updateLevel);
    this.store.subscribe(this.updateLives);
    this.store.subscribe(this.updateTime);
  }

  updateLevel(state) {
    const field = document.querySelector('.header__level-field');
    field.innerHTML = state.level;
  }

  updateLives(state) {
    const field = document.querySelector('.header__lives-field');
    const max = INITIAL_STATE.lives;

    const template = `
      ${new Array(max - state.lives)
        .fill('<span class="heart__empty">♡</span>')
        .join('')
      }
      ${new Array(state.lives)
        .fill('<span class="heart__full">♥</span>')
        .join('')
      }
    `;
    field.innerHTML = template;
  }

  updateTime(state) {
    const field = document.querySelector('.header__time-field');
    field.innerHTML = state.time;
  }

  startTimer() {
    this.store._timerId = setInterval(() => this.store.tick(), 1000);
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
