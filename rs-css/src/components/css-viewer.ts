import { CSS_FILENAME, CSS_TITLE } from '../config';
import { CodeViewer } from './code-viewer';

export default class CssViewer extends CodeViewer {
  constructor(title = CSS_TITLE, filename = CSS_FILENAME) {
    super({ title, filename, type: 'css' });
  }
}
