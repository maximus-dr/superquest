import AbstractView from '../abstract-view';


export default class Win extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <h3>Win Screen</h3>
    `;
  }
}
