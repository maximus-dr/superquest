import AbstractView from '../abstract-view';


export default class Help extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <h3>Help Screen</h3>
    `;
  }
}
