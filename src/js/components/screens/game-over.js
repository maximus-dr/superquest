import AbstractView from '../abstract-view';


export default class GameOver extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <h3>Game Over Screen</h3>
    `;
  }
}
