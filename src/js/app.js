import Intro from './components/screens/intro';
import Game from './game/game';
import GameOver from './components/screens/game-over';
import Stats from './components/screens/stats';
const main = document.querySelector('#main');


function render(element) {
  main.innerHTML = '';
  main.append(element);
}


export default class App {
  static showIntro() {
    const intro = new Intro();
    render(intro.element);
  }

  static showStats() {
    main.innerHTML = '';
    const stats = new Stats();
    render(stats.element);
  }

  static startGame() {
    main.innerHTML = '';
    const game = new Game();
    game.init();
  }

  static gameOver() {
    main.innerHTML = '';
    const gameOver = new GameOver();
    render(gameOver.element);
  }
}
