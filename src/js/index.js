import {INITIAL_STATE, levels} from './data/data';
import headerTemplate from './header';


function getElementFromTemplate(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container;
}

const screenTemplate = (level) => `
  <div class="quest">
    <p class="text">
      ${level.text}
    </p>
    <input type="text" id="quest__input">
    <ul class="answers">
      ${
        [...Object.entries(level.answers)].map(([answer]) => {
          return `<li class="answer">${answer.toUpperCase()}</li>`;
        }).join('')
      }
    </ul>  
  </div>
  <div class="result"></div>
  <small>Для справки введите <i>help</i></small>
`;

const container = document.querySelector('#main');
const screenElement = getElementFromTemplate(screenTemplate(levels[INITIAL_STATE.level]));
const headerElement = getElementFromTemplate(headerTemplate);

container.append(headerElement, screenElement);

const input = document.querySelector('#quest__input');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    input.value = '';
  }
});

input.focus();
