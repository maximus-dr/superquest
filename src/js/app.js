import Intro from './components/screens/intro';
import Game from './game/game';
import GameOver from './components/screens/game-over';
import Stats from './components/screens/stats';
import Win from './components/screens/win';
import Help from './components/screens/help';
import PreloadScreen from './components/screens/preload-screen';
import ErrorScreen from './components/screens/error-screen';
const main = document.querySelector('#main');


function render(element) {
  main.innerHTML = '';
  main.append(element);
}


export default class App {

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

  static showPreload() {
    const preloadScreen = new PreloadScreen();
    render(preloadScreen.element);
    preloadScreen.start();
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    render(errorScreen.element);
  }

  static showHelp() {
    main.innerHTML = '';
    const help = new Help();
    render(help.element);
  }

  static showIntro() {
    const intro = new Intro();
    render(intro.element);
  }

  static showStats() {
    main.innerHTML = '';
    const stats = new Stats();
    render(stats.element);
  }

  static showWin() {
    main.innerHTML = '';
    const win = new Win();
    render(win.element);
  }
}
