import { CSS_FILENAME, CSS_TITLE } from '../config';
import { App } from '../types';
import { CodeViewer } from './code-viewer';
import Fieldset from './fieldset';

const CSS_TEXT = `{
/* Styles would go here. */
}
`;

const addLineBreaks = (text: string): string => text.split('\n').join('<br>');
export default class CssViewer extends CodeViewer {
  #app: App;

  constructor(app: App, title = CSS_TITLE, filename = CSS_FILENAME) {
    super({ title, filename, type: 'css' });
    this.#app = app;
    this.setContent();
  }

  private setContent(): void {
    this.contentElement.innerHTML = addLineBreaks(CSS_TEXT);

    const fieldset = Fieldset.getInstance(this.#app);
    this.contentElement.prepend(fieldset.getElement());
  }
}
