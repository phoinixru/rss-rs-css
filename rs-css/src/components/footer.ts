import { elt } from '../utils/utils';
import Component from './component';

const CssClasses = {
  FOOTER: 'footer',
  GH_LINK: 'github',
  RS_LINK: 'rsschool',
};

const GITHUB_LINK = 'https://github.com/phoinixru';
const GITHUB_NAME = 'phoinixru';
const RSSCHOOL_LINK = 'https://rs.school/js/';

export default class Footer extends Component<HTMLElement> {
  constructor() {
    super(elt<HTMLElement>('footer', { className: CssClasses.FOOTER }));
    this.render();
  }

  private render(): void {
    this.element.append(
      elt('a', { className: CssClasses.GH_LINK, href: GITHUB_LINK }, GITHUB_NAME),
      elt('a', { className: CssClasses.RS_LINK, href: RSSCHOOL_LINK }, 'RSSchool')
    );
  }
}
