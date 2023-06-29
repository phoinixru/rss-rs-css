import { Level } from '../types';
import { elt, qs, qsa } from '../utils/utils';
import Component from './component';

const CssClasses = {
  BOARD: 'board',
  CONTENT: 'board__content',
  TITLE: 'board__title',
  TABLE: 'table',
  HIGHLIGHT: 'highlight',
  HOVER: 'hover',
};

export default class Board extends Component {
  private static instance: Board;

  #title: HTMLElement;

  #board: HTMLElement;

  private hints = new Map<HTMLElement, string>();

  private constructor() {
    const element = elt<HTMLDivElement>('div', { className: CssClasses.BOARD });
    super(element);
    this.#title = elt<HTMLElement>('h2', { className: CssClasses.TITLE });
    this.#board = elt<HTMLElement>('div', { className: CssClasses.CONTENT });
    this.render();
    this.addEventListeners();
  }

  public static getInstance(): Board {
    if (!Board.instance) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  private render(): void {
    this.element.append(this.#title, this.#board);
  }

  private addEventListeners(): void {
    const toggleHover = (element: EventTarget | null, hover: boolean): void => {
      if (!element || !(element instanceof HTMLElement)) {
        return;
      }
      this.toggleHover(element, hover);
    };

    this.#board.addEventListener('mouseover', (event) => toggleHover(event.target, true));
    this.#board.addEventListener('mouseout', (event) => toggleHover(event.target, false));
  }

  public toggleHover(element: HTMLElement, hover: boolean): void {
    element.classList.toggle(CssClasses.HOVER, hover);
    console.log(this);
  }

  public setBoard(level: Level): void {
    const { boardMarkup, doThis } = level;
    const replacer = (m: string, tag: string): string => {
      return m.replace('/>', `></${tag}>`);
    };
    const boardHTML = boardMarkup.replace(/<(\w+).*?\/>/g, replacer);

    const tableElement = elt<HTMLDivElement>('div', { className: CssClasses.TABLE });
    tableElement.innerHTML = boardHTML;
    this.#board.innerHTML = '';
    this.#board.append(tableElement);
    this.#title.innerHTML = doThis;
  }

  public highlight(selector: string): void {
    this.selectItems(selector).forEach((element) => {
      element.classList.toggle(CssClasses.HIGHLIGHT, true);
    });
  }

  public selectItems(selector: string): HTMLElement[] {
    const table = qs<HTMLElement>(`.${CssClasses.TABLE}`, this.#board);
    if (!table) {
      return [];
    }
    return qsa(selector, table);
  }

  public getBoardContent(): HTMLElement | null {
    const content = this.#board.firstElementChild;
    if (content instanceof HTMLElement) {
      return content;
    }
    return null;
  }
}
