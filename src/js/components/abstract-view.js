import {getElementFromTemplate} from '../util/util';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }
  get template() {
    throw new Error('Template is required');
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = getElementFromTemplate(this.template);
    this.bind(this._element);
    return this._element;
  }

  bind(element) {
    // bind handlers if required
  }
}
