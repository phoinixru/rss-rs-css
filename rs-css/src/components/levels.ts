import { BTN_RESET_TEXT, LEVELS_TITLE } from '../config';
import { App, GameSave, Level, LevelResult } from '../types';
import LocalStorage from '../utils/localStorage';
import { dispatch, elt, qsa } from '../utils/utils';
import Component from './component';

const CssClasses = {
  LEVELS: 'levels',
  OPEN: 'levels--open',
  TITLE: 'levels__title',
  LIST: 'level-list',
  LEVEL: 'level',
  DONE: 'level--done',
  HELPED: 'level--helped',
  CURRENT: 'level--current',
  TOGGLE: 'levels__toggle',
  RESET: 'levels-reset',
};

const toggleList = (toggle?: boolean): void => {
  document.body.classList.toggle(CssClasses.OPEN, toggle);
};

export default class LevelList extends Component<HTMLDivElement> {
  #levels;

  #list: HTMLElement;

  #save: LocalStorage<GameSave>;

  #app: App;

  constructor(levels: Level[], save: LocalStorage<GameSave>, app: App) {
    super(elt<HTMLDivElement>('div', { className: CssClasses.LEVELS }));

    this.#levels = levels;
    this.#list = elt<HTMLOListElement>('ol', { className: CssClasses.LIST });
    this.#save = save;
    this.#app = app;
    this.render();
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.element.addEventListener('click', (event) => this.handleClicks(event));
  }

  private handleClicks(event: MouseEvent): void {
    const { target } = event;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const item = target.closest(`.${CssClasses.LEVEL}`);
    if (item instanceof HTMLElement) {
      const id = Number(item.dataset.index);
      dispatch<number>('level', id);
      this.changeLevel(id);
    }

    if (target.matches(`.${CssClasses.RESET}`)) {
      this.reset();
    }

    const toggle = target.closest(`.${CssClasses.TOGGLE}`);
    if (toggle instanceof HTMLElement) {
      toggleList();
    }
  }

  public changeLevel(level: number): void {
    this.#app.loadLevel(level);
    this.markLevels();
    toggleList(false);
  }

  private render(): void {
    const title = elt<HTMLElement>('h2', { className: CssClasses.TITLE }, LEVELS_TITLE);
    const btnReset = elt<HTMLButtonElement>('button', { className: CssClasses.RESET }, BTN_RESET_TEXT);

    const menuToggle = elt<HTMLElement>('a', { className: CssClasses.TOGGLE, innerHTML: '<span></span>' });
    menuToggle.addEventListener('click', () => toggleList());

    this.#levels.forEach((level, index) => {
      const { syntax } = level;
      const listItem = elt<HTMLLIElement>('li', { className: CssClasses.LEVEL });
      listItem.innerHTML = syntax;
      listItem.dataset.index = String(index);

      this.#list.append(listItem);
    });

    this.element.innerHTML = '';
    this.element.append(title, this.#list, btnReset);
    this.markLevels();

    document.body.append(menuToggle);
  }

  public markLevels(): void {
    const currentLevel = Number(this.#save.get('currentLevel') || 0);
    const results = this.#save.get('results') as LevelResult[];

    const items = qsa<HTMLElement>('li', this.#list);
    items.forEach((listItem, index) => {
      listItem.classList.toggle(CssClasses.CURRENT, index === currentLevel);
      const levelResult = results[index];

      listItem.classList.toggle(CssClasses.DONE, levelResult === LevelResult.SOLVED);
      listItem.classList.toggle(CssClasses.HELPED, levelResult === LevelResult.SOLVED_WITH_HELP);
    });
  }

  private reset(): void {
    this.#save.set('currentLevel', 0);
    this.#save.set('results', []);
    this.#app.loadLevel(0);
    toggleList(false);
  }
}
