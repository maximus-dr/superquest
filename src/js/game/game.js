import {Store} from "./store";
import Header from './../components/header';
import Level from './../components/level';
import Footer from './../components/footer';


const INITIAL_STATE = Object.freeze({
  level: 'level-0',
  lives: 3,
  time: 0
});


export class Game {

  init() {
    this.store = new Store(INITIAL_STATE);
    this.header = new Header(this.store.state);
    this.footer = new Footer();
    this.level = new Level(this.store.currentLevel);

    this.render([
      this.header.element,
      this.level.element,
      this.footer.element
    ]);
    this.updateLives(this.store.state);
    this.focus();
    this.bind([
      'updateLevel',
      'updateLives',
      'updateTime'
    ]);
    this.subscribe([
      this.updateLevel,
      this.updateLives,
      this.updateTime
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

  updateLevel(state) {
    this.updateLevelTitle(state);
    this.updateLevelText(state);
    this.updateAnswers();
  }

  updateLevelTitle(state) {
    const field = this.header.element.querySelector('.header__level-field');
    field.innerHTML = state.level;
  }

  updateLevelText(state) {
    const field = this.level.element.querySelector('.quest__text');
    const level = this.store.currentLevel;
    field.textContent = level.text;
  }

  updateAnswers() {
    const answersList = this.level.element.querySelector('.answers');
    const answers = this.level.getAnswers(this.store.currentLevel);
    answersList.innerHTML = answers;
  }

  focus() {
    this.level.element.querySelector('#quest__input').focus();
  }
}

export const game = new Game();
