import { DEFAULT_LINES } from '../config';
import { elt } from '../utils/utils';
import Component from './component';

const CssClasses = {
  CODE: 'code',
  HEADER: 'code__header',
  TITLE: 'code__title',
  FILENAME: 'code__filename',
  MARKUP: 'code__markup',
  LINES: 'code__lines',
  CONTENT: 'code__content',
};

export type CodeViewerOptions = {
  title: string;
  filename: string;
  type?: string;
  lines?: number;
};

export const numbers = (count = 0): number[] =>
  Array<number>(count)
    .fill(1)
    .map((e, i) => e + i);

export const numToString = (num: number, maxLength = 2, fillString = ' '): string =>
  String(num).padStart(maxLength, fillString);

export class CodeViewer extends Component<HTMLDivElement> {
  #lines: number;

  #title: string;

  #filename: string;

  protected contentElement: HTMLElement;

  constructor({ lines = DEFAULT_LINES, title, filename, type }: CodeViewerOptions) {
    const element = elt<HTMLDivElement>('div', { className: CssClasses.CODE });
    if (type) {
      element.classList.add(`${CssClasses.CODE}--${type}`);
    }
    super(element);

    this.#lines = lines;
    this.#title = title;
    this.#filename = filename;
    this.contentElement = elt<HTMLElement>('div', { className: CssClasses.CONTENT });
    this.render();
  }

  private render(): void {
    const titleElement = elt<HTMLHeadingElement>('h3', { className: CssClasses.TITLE }, this.#title);
    const filenameElement = elt<HTMLHeadingElement>('h4', { className: CssClasses.FILENAME }, this.#filename);
    const linesElement = this.renderLines();
    const header = elt<HTMLElement>('div', { className: CssClasses.HEADER });
    const markup = elt<HTMLDivElement>('div', { className: CssClasses.MARKUP });

    header.append(titleElement, filenameElement);
    markup.append(linesElement, this.contentElement);
    this.element.append(header, markup);
  }

  private renderLines(): HTMLElement {
    const linesContainer = elt<HTMLElement>('div', { className: CssClasses.LINES });
    const linesHtml = numbers(this.#lines)
      .map((num) => numToString(num))
      .join('<br>');

    linesContainer.innerHTML = linesHtml;
    return linesContainer;
  }
}
