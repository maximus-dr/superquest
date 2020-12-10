import AbstractView from './abstract-view';

export default class Header extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <header class="header">
      <div class="header__level">
        <span>Мир: </span> 
        <span class="header__level-field">${this.state.level}</span>
      </div>
      <div>
        <span>Жизни:</span>
        <span class="header__lives-field"></span>
      </div>
      <div>Время: 0</div>
      </header>
    `;
  }
}
