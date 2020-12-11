import AbstractView from '../abstract-view';


export default class Stats extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <h3>Stats Screen</h3>
    `;
  }
}
