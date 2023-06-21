import { Level } from '../types';
import { elt } from '../utils/utils';
import Component from './component';

const CssClasses = {
  LEVELS: 'levels',
  LIST: 'level-list',
  LEVEL: 'level-item',
  DONE: 'level-item--done',
  HELPED: 'level-item--helped',
};

export default class LevelList extends Component {
  #levels;

  #currentLevel = 0;

  constructor(levels: Level[]) {
    super(elt<HTMLDivElement>('div', { className: CssClasses.LEVELS }));

    this.#levels = levels;
    this.render();
  }

  public changeLevel(level: number): void {
    this.#currentLevel = level;
  }

  private render(): void {
    const list = elt<HTMLOListElement>('ol', { className: CssClasses.LIST });

    this.element.append('Levels:', list);
  }
}
