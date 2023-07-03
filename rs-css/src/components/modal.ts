import { elt } from '../utils/utils';
import Component from './component';

const CssClasses = {
  MODAL: 'modal',
  SHOW: 'modal--show',
  CONTENT: 'modal__content',
  YEP: 'button--modal',
  NOPE: 'button--modal',
};

const GARDEN_LINK = 'https://www.csszengarden.com/';
const html = `
<h3>Congratulations!</h3>
<p>You've mastered all CSS selectors</p>
<p>You are now ready to enter <a href="${GARDEN_LINK}" target="_blank">CSS Zen Garden</a></p>
<p>Good luck on your further path towards CSS Enlightenment!</p>`;

const BTN_YEP_TEXT = 'Lead me...';
const BTN_NOPE_TEXT = `Nope, I'm good`;

export default class Modal extends Component<HTMLElement> {
  constructor() {
    super(elt<HTMLElement>('div', { className: CssClasses.MODAL }));
    this.render();
  }

  private render(): void {
    const content = elt<HTMLElement>('div', { className: CssClasses.CONTENT });
    content.innerHTML = html;

    const btnYep = elt<HTMLButtonElement>('button', { className: CssClasses.YEP }, BTN_YEP_TEXT);
    const btnNope = elt<HTMLButtonElement>('button', { className: CssClasses.NOPE }, BTN_NOPE_TEXT);

    btnYep.addEventListener('click', () => {
      this.toggle(false);
      window.open(GARDEN_LINK);
    });

    btnNope.addEventListener('click', () => {
      this.toggle(false);
    });

    content.append(btnYep, btnNope);
    this.element.append(content);
  }

  private toggle(show: boolean): void {
    this.element.classList.toggle(CssClasses.SHOW, show);
  }

  public show(): void {
    this.toggle(true);
  }
}
