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

    this.render([
      this.header.element,
      this.level.element
    ]);
    this.updateLives(this.store.state);
    this.focus();
    this.bind([
      'updateLevel',
      'updateLives',
      'updateLevelText'
    ]);
    this.subscribe([
      this.updateLevel,
      this.updateLives,
      this.updateLevelText,
      this.updateLevelText
    ]);
  }

  bind(methods) {
    for (const method of methods) {
      this[method] = this[method].bind(this);
    }
  }

  subscribe(listeners) {
    for (const listener of listeners) {
      this.store.subscribe(listener);
    }
  }

  render(components) {
    const app = document.querySelector('.app');
    for (const component of components) {
      app.append(component);
    }
  }

  updateLevel(state) {
    const field = this.header.element.querySelector('.header__level-field');
    field.innerHTML = state.level;
  }

  updateLives(state) {
    const field = this.header.element.querySelector('.header__lives-field');
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
    const field = this.header.element.querySelector('.header__time-field');
    field.innerHTML = state.time;
  }

  startTimer() {
    this.store._timerId = setInterval(() => this.store.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this.store._timerId);
  }

  updateLevelText(state) {
    const field = document.querySelector('.quest__text');
    const level = this.store.getLevel(state.level);
    field.textContent = level.text;
  }

  focus() {
    this.level.element.querySelector('#quest__input').focus();
  }
}

export const game = new Game();
