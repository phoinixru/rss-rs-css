import { BTN_ENTER_TEXT, BTN_HELP_TEXT, INPUT_DELAY, INPUT_PLACEHOLDER_TEXT, MAX_MISTAKES } from '../config';
import { App } from '../types';
import { elt, pause } from '../utils/utils';
import Component from './component';

const CssClasses = {
  FIELDSET: 'fieldset',
  FIELDSET_HELP: 'fieldset--help',
  INPUT: 'input',
  BUTTON: 'button',
  ENTER: 'button--enter',
  HELP: 'button--help',
};

const classes = (...arr: string[]): string => arr.join(' ');

export default class Fieldset extends Component<HTMLFieldSetElement> {
  private static instance: Fieldset;

  #app: App;

  #input: HTMLInputElement;

  #btnEnter: HTMLButtonElement;

  #btnHelp: HTMLButtonElement;

  #mistakes = 0;

  private constructor(app: App) {
    const { INPUT, FIELDSET, BUTTON, ENTER, HELP } = CssClasses;
    super(elt<HTMLFieldSetElement>('fieldset', { className: FIELDSET }));

    this.#app = app;
    this.#input = elt<HTMLInputElement>('input', { className: INPUT, placeholder: INPUT_PLACEHOLDER_TEXT });
    this.#btnEnter = elt<HTMLButtonElement>('button', { className: classes(BUTTON, ENTER) }, BTN_ENTER_TEXT);
    this.#btnHelp = elt<HTMLButtonElement>('button', { className: classes(BUTTON, HELP) }, BTN_HELP_TEXT);
    this.render();

    this.addEventListeners();
  }

  public static getInstance(app: App): Fieldset {
    if (!Fieldset.instance) {
      Fieldset.instance = new Fieldset(app);
    }
    return Fieldset.instance;
  }

  private addEventListeners(): void {
    this.#input.addEventListener('keyup', (event) => this.handleKeyUp(event));
    this.#btnEnter.addEventListener('click', () => this.handleEnterButton());

    this.#btnHelp.addEventListener('click', () => {
      this.handleHelpButton().catch(() => null);
    });
  }

  private render(): void {
    this.element.append(this.#input, this.#btnHelp, this.#btnEnter);
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const { key } = event;
    if (key === 'Enter') {
      this.guess();
    }
  }

  private handleEnterButton(): void {
    this.guess();
  }

  private async handleHelpButton(): Promise<void> {
    const answer = this.#app.requestAnswer();
    this.toggleDisabled(true);
    await this.enterValue(answer);
    this.toggleDisabled(false);
  }

  private guess(): void {
    const rule = this.getValue();
    const result = this.#app.checkAnswer(rule);

    if (!result) {
      this.mistake();
    } else {
      this.correctAnswer();
    }
  }

  private toggleDisabled(disabled = true): void {
    this.element.disabled = disabled;
  }

  private getValue(): string {
    return this.#input.value;
  }

  private async enterValue(value: string): Promise<void> {
    const field = this.#input;
    field.value = '';

    const chars = [...value];
    for (let i = 0; i < chars.length; i += 1) {
      field.value += chars[i];
      // eslint-disable-next-line no-await-in-loop
      await pause(INPUT_DELAY);
    }
    this.focus();
  }

  private focus(): void {
    this.#input.focus();
  }

  private mistake(): void {
    this.#mistakes += 1;
    if (this.#mistakes >= MAX_MISTAKES) {
      this.toggleHelpButton(true);
    }

    this.#app.indicateMistake();
  }

  private correctAnswer(): void {
    this.#app.correctAnswer();
    this.reset();
    this.focus();
  }

  private toggleHelpButton(show: boolean): void {
    this.element.classList.toggle(CssClasses.FIELDSET_HELP, show);
  }

  private reset(): void {
    this.#input.value = '';
    this.#mistakes = 0;
    this.toggleHelpButton(false);
  }
}
