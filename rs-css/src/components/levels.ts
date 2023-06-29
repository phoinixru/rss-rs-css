import { Level } from '../types';
import { dispatch, elt } from '../utils/utils';
import Component from './component';

const CssClasses = {
  LEVELS: 'levels',
  LIST: 'level-list',
  LEVEL: 'level',
  DONE: 'level--done',
  HELPED: 'level--helped',
  CURRENT: 'level--current',
};

export default class LevelList extends Component {
  #levels;

  #currentLevel = 0;

  constructor(levels: Level[]) {
    super(elt<HTMLDivElement>('div', { className: CssClasses.LEVELS }));

    this.#levels = levels;
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
    if (!(item instanceof HTMLElement)) {
      return;
    }

    const id = Number(item.dataset.index);
    this.changeLevel(id);
    dispatch<number>('level', id);
  }

  public changeLevel(level: number): void {
    this.#currentLevel = level;
    this.render();
  }

  private render(): void {
    const list = elt<HTMLOListElement>('ol', { className: CssClasses.LIST });

    this.#levels.forEach((level, index) => {
      const { syntax } = level;
      const listItem = elt<HTMLLIElement>('li', { className: CssClasses.LEVEL });
      listItem.innerHTML = syntax;
      listItem.dataset.index = String(index);

      list.append(listItem);

      if (index === this.#currentLevel) {
        listItem.classList.add(CssClasses.CURRENT);
      }
    });

    this.element.innerHTML = '';
    this.element.append('Levels:', list);
  }
}
