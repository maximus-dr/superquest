import {INITIAL_STATE, levels} from './data/data';
import headerTemplate from './game/header';
import {getElementFromTemplate} from './util';


function getAnswers(level) {
  const answers = level.answers.map((answer) => {
    return `
      <li class="answer">
        ${answer.action.toUpperCase() + '. ' + answer.title}
      </li>
    `;
  });

  return answers.join('');
}

function screenTemplate(level) {
  return `
    <div class="quest">
      <p class="text">
        ${level.text}
      </p>
      <input type="text" id="quest__input">
      <ul class="answers">
        ${getAnswers(level)}
      </ul>  
    </div>
    <div class="result"></div>
    <small>Для справки введите <i>help</i></small>
  `;
}


const container = document.querySelector('#main');
const headerElement = getElementFromTemplate(headerTemplate);

container.before(headerElement);

function renderScreen(state) {
  const current = state.level;
  const template = screenTemplate(levels[current]);
  const screen = getElementFromTemplate(template);
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
