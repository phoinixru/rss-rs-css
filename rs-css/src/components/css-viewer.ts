import { CSS_FILENAME, CSS_TITLE } from '../config';
import { CodeViewer } from './code-viewer';

const CSS_TEXT = `{
/* Styles would go here. */
}
`;

const addLineBreaks = (text: string): string => text.split('\n').join('<br>');
export default class CssViewer extends CodeViewer {
  constructor(title = CSS_TITLE, filename = CSS_FILENAME) {
    super({ title, filename, type: 'css' });
    this.setContent();
  }

  private setContent(): void {
    this.contentElement.innerHTML = addLineBreaks(CSS_TEXT);
  }
}
