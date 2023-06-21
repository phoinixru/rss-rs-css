export default class Component {
  protected element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
