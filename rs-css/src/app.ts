import { Level, App, GameSave, LevelResult } from './types';
import { elt } from './utils/utils';
import LEVELS from './levels';
import LocalStorage from './utils/localStorage';
import Header from './components/header';
import Footer from './components/footer';
import LevelList from './components/levels';
import Board from './components/board';
import CssViewer from './components/css-viewer';
import HtmlViewer from './components/html-viewer';
import { DEFAULT_LEVEL } from './config';
import Modal from './components/modal';

const CssClasses = {
  APP: 'app',
  MISTAKE: 'app--mistake',
  WRAPPER: 'wrapper',
  HEADER: 'header',
  MAIN: 'main',
  FOOTER: 'footer',
  ASIDE: 'aside',
  CODES: 'codes',
};

const compareArrays = <T>(firstArray: T[], secondArray: T[]): boolean =>
  firstArray.length === secondArray.length &&
  firstArray.every((el) => secondArray.includes(el)) &&
  secondArray.every((el) => firstArray.includes(el));

const EMPTY_SAVE: GameSave = {
  currentLevel: DEFAULT_LEVEL,
  results: [],
};

export default class RsCss implements App {
  #levels: Level[];

  #save: LocalStorage<GameSave>;

  #board: Board;

  #cssViewer: CssViewer;

  #htmlViewer: HtmlViewer;

  #levelList: LevelList;

  #currentLevel: Level;

  #helpRequested = false;

  #wrapper: HTMLDivElement;

  #modal: Modal;

  constructor() {
    this.#wrapper = elt<HTMLDivElement>('div', { className: CssClasses.WRAPPER });
    this.#levels = LEVELS;
    [this.#currentLevel] = LEVELS;
    this.#save = new LocalStorage(EMPTY_SAVE);
    this.#board = Board.getInstance();
    this.#cssViewer = new CssViewer(this);
    this.#htmlViewer = HtmlViewer.getInstance();
    this.#levelList = new LevelList(this.#levels, this.#save, this);
    this.#modal = new Modal();
    this.restoreGame();
    this.addEventListeners();
  }

  private addEventListeners(): void {
    document.addEventListener('level', (event) => this.handleLevelChange(event));
    document.addEventListener('animationend', () => {
      this.#wrapper.classList.remove(CssClasses.MISTAKE);
    });
  }

  private handleLevelChange(event: CustomEvent<number>): void {
    const levelId = event.detail;
    this.loadLevel(levelId);
  }

  public start(): void {
    const { APP, MAIN, ASIDE, CODES } = CssClasses;
    this.#wrapper.classList.add(APP);

    const mainElement = elt<HTMLElement>('main', { className: MAIN });
    const asideElement = elt<HTMLElement>('aside', { className: ASIDE });
    const codesElement = elt<HTMLElement>('div', { className: CODES });

    const header = new Header();
    const footer = new Footer();

    codesElement.append(this.#cssViewer.getElement(), this.#htmlViewer.getElement());

    mainElement.append(header.getElement(), this.#board.getElement(), codesElement, footer.getElement());
    asideElement.append(this.#levelList.getElement());

    this.#wrapper.append(mainElement, asideElement);
    document.body.append(this.#wrapper, this.#modal.getElement());
  }

  public loadLevel(id: number): void {
    if (id < 0 || id > this.#levels.length - 1) {
      return;
    }

    const level = this.#levels[id];
    this.#currentLevel = level;
    this.#helpRequested = false;

    const { selector } = level;
    this.#board.setBoard(level);
    this.#htmlViewer.setContent(this.#board.getBoardContent());
    this.#board.highlight(selector);

    this.#save.set('currentLevel', this.getCurrentLevelId());
    this.updateLevelList();
  }

  public checkAnswer(answer: string): boolean {
    let answerElements;
    try {
      answerElements = this.#board.selectItems(answer, true);
    } catch (e) {
      return false;
    }

    const solution = this.getCorrectAnswer();
    const solutionElements = this.#board.selectItems(solution, true);
    const win = compareArrays(solutionElements, answerElements);

    return win;
  }

  public requestAnswer(): string {
    this.#helpRequested = true;
    return this.getCorrectAnswer();
  }

  private getCorrectAnswer(): string {
    return this.#currentLevel.selector;
  }

  public indicateMistake(): void {
    this.#wrapper.classList.add(CssClasses.MISTAKE);
  }

  public correctAnswer(): void {
    const levelId = this.getCurrentLevelId();
    const results = this.#save.get('results') as LevelResult[];
    results[levelId] = this.#helpRequested ? LevelResult.SOLVED_WITH_HELP : LevelResult.SOLVED;
    this.#save.set('results', results);

    this.updateLevelList();

    if (this.hasWon()) {
      this.victory();
    } else {
      this.loadNextLevel();
    }
  }

  private loadNextLevel(): void {
    const current = this.getCurrentLevelId();
    let next = this.getNextUnsolved(current);
    console.log(next);
    if (next < 0) {
      next = this.getNextUnsolved();
    }
    console.log(next);

    this.loadLevel(next);
  }

  private getNextUnsolved(from = -1): number {
    const results = this.#save.get('results') as LevelResult[];
    return this.#levels.findIndex((_, index) => index > from && !results[index]);
  }

  private getCurrentLevelId(): number {
    return this.#levels.indexOf(this.#currentLevel);
  }

  private updateLevelList(): void {
    this.#levelList.markLevels();
  }

  private restoreGame(): void {
    const level = Number(this.#save.get('currentLevel') || DEFAULT_LEVEL);
    this.loadLevel(level);
  }

  private hasWon(): boolean {
    const results = this.#save.get('results') as LevelResult[];
    const hasWon = this.#levels.every(
      (_, i) => results[i] === LevelResult.SOLVED || results[i] === LevelResult.SOLVED_WITH_HELP
    );

    return hasWon;
  }

  private victory(): void {
    this.#modal.show();
  }
}
