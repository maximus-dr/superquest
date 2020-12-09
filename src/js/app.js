
import { Game } from './game/game';
import Header from './components/header';
import Level from './components/level';
import { levels } from './data/data';

const INITIAL_STATE = Object.freeze({
  level: 'level-0',
  lives: 3,
  time: 0
});

class App {
  init() {
    this.game = new Game(INITIAL_STATE);
    this.header = new Header(this.game.state);

    const currentLevel = levels[this.game.state.level];
    this.level = new Level(currentLevel);
    
    this.render(this.header.element);
    this.render(this.level.element);
  }

  render(component) {
    document.body.append(component);
  }
}

export const app = new App(INITIAL_STATE);
