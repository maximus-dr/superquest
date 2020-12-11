import AbstractView from './abstract-view';


export default class Level extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <div class="quest">
        <p class="quest__text">
          ${this.level.text}
        </p>
        <input type="text" id="quest__input">
        <ul class="answers">
          ${this.getAnswers(this.level)}
        </ul>  
      </div>
    `;
  }

  getAnswers(level) {
    const answers = level.answers.map((answer) => {
      return `
        <li class="answer">
          ${answer.action.toUpperCase() + '. ' + answer.title}
        </li>
      `;
    });
    return answers.join('');
  }
}
