import AbstractView from '../abstract-view';


export default class Intro extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <h3>Intro Screen</h3>
    `;
  }
}
