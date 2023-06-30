export type Level = {
  doThis: string;
  selector: string;
  boardMarkup: string;
  syntax: string;
  selectorName?: string;
  helpTitle?: string;
  help?: string;
  examples?: string[];
};

export abstract class App {
  public abstract start(): void;
  public abstract requestAnswer(): string;
  public abstract checkAnswer(answer: string): boolean;
  public abstract indicateMistake(): void;
  public abstract correctAnswer(): void;
}

export const enum LevelResult {
  NEW,
  SOLVED,
  SOLVED_WITH_HELP,
}

export type GameSave = {
  currentLevel?: number;
  results?: LevelResult[];
};

export type ElementProps = {
  className?: string;
  innerHTML?: string;
  href?: string;
  placeholder?: string;
} | null;

declare global {
  interface DocumentEventMap {
    level: CustomEvent<number>;
  }
}
