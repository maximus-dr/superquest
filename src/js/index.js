import {INITIAL_STATE, levels} from './data/data';
import headerTemplate from './header';


function getElementFromTemplate(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container;
}

function screenTemplate(level) {
  const answers = level.answers.map((answer) => {
    return `
      <li class="answer">
        ${answer.action.toUpperCase() + '. ' + answer.title}
      </li>
    `;
  });

  return `
    <div class="quest">
      <p class="text">
        ${level.text}
      </p>
      <input type="text" id="quest__input">
      <ul class="answers">
        ${answers.join('')}
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
  const screen = getElementFromTemplate(screenTemplate(levels[state.level]));
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
