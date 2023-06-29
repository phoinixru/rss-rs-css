import { HTML_FILENAME, HTML_TITLE } from '../config';
import { elt } from '../utils/utils';
import Board from './board';
import { CodeViewer } from './code-viewer';

const CssClasses = {
  NODE: 'node',
  HOVER: 'node--hover',
  ROOT: 'node--root',
  TAG: 'tag',
};

enum TYPE {
  BRACKET = 'b',
  TAG = 't',
  ATTRIBUTE = 'a',
  VALUE = 'v',
  QUOTE = 'q',
  SPACE = 's',
  EQ = 'e',
}

const item = (type: TYPE, value: string): HTMLSpanElement => elt<HTMLSpanElement>('span', { className: type }, value);
const openBracket = (close = false): HTMLSpanElement => item(TYPE.BRACKET, close ? '</' : '<');
const closeBracket = (close = false): HTMLSpanElement => item(TYPE.BRACKET, close ? '/>' : '>');
const eq = (): HTMLSpanElement => item(TYPE.EQ, '=');
const tag = (text: string): HTMLSpanElement => item(TYPE.TAG, text.toLowerCase());
const attr = (text: string): HTMLSpanElement => item(TYPE.ATTRIBUTE, text);
const quote = (): HTMLSpanElement => item(TYPE.QUOTE, '"');
const value = (text: string): HTMLSpanElement => item(TYPE.VALUE, text);
const space = (): HTMLSpanElement => item(TYPE.SPACE, ' ');

const openTag = (element: HTMLElement, hasChildren: boolean): HTMLElement => {
  const tagElement = elt<HTMLSpanElement>('span', { className: CssClasses.TAG });
  tagElement.append(openBracket(), tag(element.tagName));

  element.getAttributeNames().forEach((name) => {
    const text = element.getAttribute(name);
    tagElement.append(space(), attr(name));
    if (text !== null) {
      tagElement.append(eq(), quote(), value(text), quote());
    }
  });
  tagElement.append(closeBracket(!hasChildren));

  return tagElement;
};

const closeTag = (element: HTMLElement): HTMLElement => {
  const tagElement = elt<HTMLSpanElement>('span', { className: CssClasses.TAG });
  tagElement.append(openBracket(true), tag(element.tagName), closeBracket(false));
  return tagElement;
};

const elementsMap = new Map<HTMLElement, HTMLElement>();

function buildTree(element: HTMLElement, root = false): HTMLElement {
  const node = elt<HTMLDivElement>('div', { className: CssClasses.NODE });
  if (root) {
    node.classList.add(CssClasses.ROOT);
  }

  const children = [...element.children];
  const hasChildren = children.length > 0;

  node.append(openTag(element, hasChildren));

  children.forEach((child) => {
    if (child instanceof HTMLElement) {
      node.append(buildTree(child));
    }
  });

  if (hasChildren) {
    node.append(closeTag(element));
  }

  elementsMap.set(element, node);
  elementsMap.set(node, element);

  return node;
}

export default class HtmlViewer extends CodeViewer {
  private static instance: HtmlViewer;

  constructor(title = HTML_TITLE, filename = HTML_FILENAME) {
    super({ title, filename, type: 'html' });
    this.addEventListeners();
  }

  private addEventListeners(to: HTMLElement = this.contentElement): void {
    const toggleHover = (element: EventTarget | null, hover: boolean): void => {
      if (!element || !(element instanceof HTMLElement)) {
        return;
      }

      let node;
      if (to === this.contentElement) {
        node = element.closest(`.${CssClasses.NODE}`);
      } else {
        node = elementsMap.get(element);
      }

      if (!node || !(node instanceof HTMLElement)) {
        return;
      }

      this.toggleHover(node, hover);
    };

    to.addEventListener('mouseover', (event) => toggleHover(event.target, true));
    to.addEventListener('mouseout', (event) => toggleHover(event.target, false));
  }

  public static getInstance(): HtmlViewer {
    if (!HtmlViewer.instance) {
      HtmlViewer.instance = new HtmlViewer();
    }
    return HtmlViewer.instance;
  }

  public setContent(element: HTMLElement | null): void {
    this.contentElement.innerHTML = '';
    elementsMap.clear();
    if (element === null) {
      return;
    }

    this.contentElement.append(buildTree(element, true));
    this.addEventListeners(element);
  }

  private toggleHover(element: HTMLElement, hover = false): void {
    const rootElement = this.contentElement.firstChild;
    if (element === rootElement) {
      return;
    }
    element.classList.toggle(CssClasses.HOVER, hover);

    const boardElement = elementsMap.get(element);
    if (!boardElement) {
      return;
    }
    const board = Board.getInstance();
    board.toggleHover(boardElement, hover);
  }
}
