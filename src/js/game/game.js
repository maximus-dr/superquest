import {Store} from "./store";
import Header from './../components/header';
import Level from './../components/level';
import Footer from './../components/footer';


const INITIAL_STATE = Object.freeze({
  level: 'level-0',
  lives: 3,
  time: 0
});

const ENTER_KEYCODE = 13;

export default class Game {

  init() {
    this.store = new Store(INITIAL_STATE);
    this.header = new Header(this.store.state);
    this.level = new Level(this.store.currentLevel);
    this.footer = new Footer();
    this.input = this.level.element.querySelector('#quest__input');

    this.render([
      this.header.element,
      this.level.element,
      this.footer.element
    ]);
    this.updateLives(this.store.state);

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

    this.input.focus();
    this.input.addEventListener('keydown', (evt) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        const value = evt.target.value;
        this.onInputEnter(value);
        this.input.value = '';
      }
    });
    this.startTimer();
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

  updateLevelText() {
    const field = this.level.element.querySelector('.quest__text');
    const level = this.store.currentLevel;
    field.textContent = level.text;
  }

  updateAnswers() {
    const answersList = this.level.element.querySelector('.answers');
    const answers = this.level.getAnswers(this.store.currentLevel);
    answersList.innerHTML = answers;
  }

  onInputEnter(value) {
    const userAnswer = String(value).trim().toLowerCase();
    let result = null;

    if (userAnswer === 'help') {
      result = 'help';
    } else {
      // finds coincidences between userAnswer and available answers
      for (let answer of this.store.currentLevel.answers) {
        if (userAnswer === answer.action) {
          result = answer.result;
        }
      }
    }

    if (result) {
      this.onAnswer(result);
    }
  }

  onAnswer(result) {
    switch (result) {
      case 'DIE':
        this.store.die();
        this.showResult(`Вы потеряли жизнь. Осталось жизней: ${this.store.state.lives}`);
        break;
      case 'NEXT_LEVEL':
        this.store.next();
        break;
      case 'WIN':
        this.store.win();
        break;
      case 'help':
        this.store.help();
        break;
      default:
        throw new Error(`Unknown result: ${result}`);
    }
  }

  showResult(value) {
    const container = this.footer.element.querySelector('.result');
    container.innerHTML = value;
  }
}

export const game = new Game();
