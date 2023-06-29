import { Level, App, GameSave } from './types';
import LEVELS from './levels';
import LocalStorage from './utils/localStorage';
import { elt } from './utils/utils';
import Header from './components/header';
import Footer from './components/footer';
import LevelList from './components/levels';
import Board from './components/board';

const CssClasses = {
  WRAPPER: 'wrapper',
  HEADER: 'header',
  MAIN: 'main',
  FOOTER: 'footer',
  ASIDE: 'aside',
};

export default class RsCss implements App {
  #levels: Level[];

  #save: LocalStorage<GameSave>;

  #board: Board;

  #levelList: LevelList;

  constructor() {
    this.#levels = LEVELS;
    this.#save = new LocalStorage();
    this.#levelList = new LevelList(this.#levels);
    this.#board = new Board();
    this.loadLevel(2);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    document.addEventListener('level', (event) => this.handleLevelChange(event));
  }

  private handleLevelChange(event: CustomEvent<number>): void {
    const levelId = event.detail;
    this.loadLevel(levelId);
  }

  public start(): void {
    const wrapper = elt<HTMLDivElement>('div', { className: CssClasses.WRAPPER });
    const mainElement = elt<HTMLElement>('main', { className: CssClasses.MAIN });
    const asideElement = elt<HTMLElement>('aside', { className: CssClasses.ASIDE });

    const header = new Header();
    const footer = new Footer();

    mainElement.append(header.getElement(), this.#board.getElement(), footer.getElement());
    asideElement.append(this.#levelList.getElement());

    wrapper.append(mainElement, asideElement);
    document.body.append(wrapper);
  }

  private loadLevel(id: number): void {
    if (id < 0 || id > this.#levels.length - 1) {
      return;
    }

    const level = this.#levels[id];
    this.#board.setBoard(level);
  }
}
