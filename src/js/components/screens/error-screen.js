import AbstractView from '../abstract-view';


export default class ErrorScreen extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <h3>Error Screen</h3>
      <div>${this.error}</div>
    `;
  }
}
