import AbstractView from './abstract-view';


export default class Footer extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="result"></div>
      <small>Для справки введите <i>help</i></small>
    `;
  }
}
