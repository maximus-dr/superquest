import {INITIAL_STATE, levels} from './data/data';
import Header from './components/header';
import Level from './components/level';


const container = document.querySelector('#main');
const header = new Header(INITIAL_STATE).element;

container.before(header);

function renderScreen(state) {
  const current = state.level;
  const level = levels[current];
  const screen = new Level(level).element;
  container.innerHTML = '';
  container.append(screen);

  const input = document.querySelector('#quest__input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const userAnswer = input.value.trim().toLowerCase();
      const destination = userAnswer in levels[state.level].answers
        ? levels[state.level].answers[userAnswer]
        : null;

      if (destination) {
        renderScreen(Object.assign({}, state, {'level': destination}));
      }
    }
  });
  input.focus();
}

renderScreen(INITIAL_STATE);
