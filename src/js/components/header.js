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
        Жизни:
        ${new Array(3 - this.state.lives)
          .fill('<span class="heart__empty">♡</span>')
          .join('')
        }
        ${new Array(this.state.lives)
          .fill('<span class="heart__full">♥</span>')
          .join('')
        }
      </div>
      <div>Время: 0</div>
      </header>
    `;
  }
}
