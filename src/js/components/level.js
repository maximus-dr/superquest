import AbstractView from './abstract-view';


export default class Level extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <div class="quest">
        <p class="text">
          ${this.level.text}
        </p>
        <input type="text" id="quest__input">
        <ul class="answers">
          ${this._getAnswers(this.level)}
        </ul>  
      </div>
      <div class="result"></div>
      <small>Для справки введите <i>help</i></small>
    `;
  }

  _getAnswers(level) {
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
