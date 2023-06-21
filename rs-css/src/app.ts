import { Level, App, GameSave } from './types';
import LEVELS from './levels';
import LocalStorage from './utils/localStorage';
import { elt } from './utils/utils';
import Header from './components/header';
import Footer from './components/footer';
import LevelList from './components/levels';

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

  #levelList: LevelList;

  constructor() {
    this.#levels = LEVELS;
    this.#save = new LocalStorage();
    this.#levelList = new LevelList(this.#levels);
  }

  public start(): void {
    const wrapper = elt<HTMLDivElement>('div', { className: CssClasses.WRAPPER });
    const mainElement = elt<HTMLElement>('main', { className: CssClasses.MAIN });
    const asideElement = elt<HTMLElement>('aside', { className: CssClasses.ASIDE });

    const header = new Header();
    const footer = new Footer();

    mainElement.append(header.getElement(), footer.getElement());
    asideElement.append(this.#levelList.getElement());

    wrapper.append(mainElement, asideElement);
    document.body.append(wrapper);
  }
}
