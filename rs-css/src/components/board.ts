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
  HINT: 'board__hint',
  HINT_SHOW: 'board__hint--show',
};

const html = (element: HTMLElement): string => {
  return element.outerHTML.replace(/>.+</ms, '><');
};

const offsetTo = (element: HTMLElement, to: HTMLElement): number => {
  let fullOffset = element.offsetLeft;
  let parent = element.offsetParent as HTMLElement;
  while (parent && parent !== to) {
    fullOffset += parent.offsetLeft;
    parent = parent.offsetParent as HTMLElement;
  }
  return fullOffset;
};

export default class Board extends Component<HTMLDivElement> {
  private static instance: Board;

  #title: HTMLElement;

  #board: HTMLElement;

  #shadowBoard: HTMLElement;

  #hint: HTMLElement;

  private hints = new Map<HTMLElement, string>();

  private constructor() {
    super(elt<HTMLDivElement>('div', { className: CssClasses.BOARD }));
    this.#title = elt<HTMLElement>('h2', { className: CssClasses.TITLE });
    this.#board = elt<HTMLElement>('div', { className: CssClasses.CONTENT });
    this.#shadowBoard = elt<HTMLElement>('div');
    this.#hint = elt<HTMLElement>('div', { className: CssClasses.HINT });
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
    this.element.append(this.#title, this.#board, this.#hint);
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
    this.toggleHint(element, hover);
  }

  private toggleHint(element: HTMLElement, show: boolean): void {
    const hintText = this.hints.get(element);
    if (!hintText) {
      return;
    }

    if (show) {
      this.#hint.innerText = hintText;
      const offsetLeft = offsetTo(element, this.#board) + element.offsetWidth / 2;
      this.#hint.style.left = `${offsetLeft}px`;
    }

    this.#hint.classList.toggle(CssClasses.HINT_SHOW, show);
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
    this.#shadowBoard.innerHTML = tableElement.outerHTML;
    this.#title.innerHTML = doThis;

    this.prepareHints(tableElement);
  }

  private prepareHints(element: HTMLElement): void {
    this.hints.clear();
    const elements = qsa<HTMLElement>('*', element);
    elements.forEach((el) => {
      this.hints.set(el, html(el));
    });
  }

  public highlight(selector: string): void {
    this.selectItems(selector).forEach((element) => {
      element.classList.toggle(CssClasses.HIGHLIGHT, true);
    });
  }

  public selectItems(selector: string, fromShadow = false): HTMLElement[] {
    const table = qs<HTMLElement>(`.${CssClasses.TABLE}`, fromShadow ? this.#shadowBoard : this.#board);
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
