import { HTML_FILENAME, HTML_TITLE } from '../config';
import { CodeViewer } from './code-viewer';

export default class HtmlViewer extends CodeViewer {
  constructor(title = HTML_TITLE, filename = HTML_FILENAME) {
    super({ title, filename, type: 'html' });
  }
}
