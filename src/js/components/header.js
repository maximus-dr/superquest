import AbstractView from './abstract-view';

export default class Header extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <header class="header">
      <div>Мир: ${this.state.level}</div>
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
