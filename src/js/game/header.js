import {INITIAL_STATE} from '../data/data';

const headerTemplate = (state) => `
  <header class="header">
  <div>Мир: ${state.level}</div>
  <div>
    Жизни:
    ${new Array(3 - state.lives)
      .fill('<span class="heart__empty">♡</span>')
      .join('')
    }
    ${new Array(state.lives)
      .fill('<span class="heart__full">♥</span>')
      .join('')
    }
  </div>
  <div>Время: 0</div>
  </header>
`;

export default headerTemplate(INITIAL_STATE);
