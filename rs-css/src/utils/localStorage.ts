const { stringify, parse } = JSON;
const STORAGE_NAME = 'phoinixru-rs-css';

export default class LocalStorage<T extends Record<string, unknown>> {
  #name: string;

  #data: T = {} as T;

  constructor(name = STORAGE_NAME) {
    this.#name = name;

    this.load();
  }

  public set(prop: keyof T, value: T[keyof T]): void {
    this.load();
    if (value === undefined) {
      delete this.#data[prop];
    } else {
      Object.assign(this.#data, { [prop]: value });
    }
    this.save();
  }

  public get(prop: keyof T): T[keyof T] {
    return this.#data[prop];
  }

  private load(): T {
    let storedData: T;
    try {
      storedData = parse(localStorage.getItem(this.#name) || '{}') as T;
    } catch (e) {
      storedData = {} as T;
    }
    this.#data = storedData;
    return storedData;
  }

  private save(): void {
    localStorage.setItem(this.#name, stringify(this.#data));
  }
}
