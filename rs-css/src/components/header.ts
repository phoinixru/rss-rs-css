import { elt } from '../utils/utils';
import Component from './component';

const CssClasses = {
  HEADER: 'header',
};

export default class Header extends Component {
  constructor() {
    super(elt<HTMLElement>('header', { className: CssClasses.HEADER }));
    this.render();
  }

  private render(): void {
    this.element.innerHTML = '<h1>RS CSS</h1>';
  }
}
