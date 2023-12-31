import { STORAGE_NAME } from '../config';

const { stringify, parse } = JSON;

export default class LocalStorage<T extends Record<string, unknown>> {
  #name: string;

  #defaultData: string;

  #data: T = {} as T;

  constructor(defaultData = {}, name = STORAGE_NAME) {
    this.#name = name;
    this.#defaultData = JSON.stringify(defaultData);

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
      storedData = parse(localStorage.getItem(this.#name) || this.#defaultData) as T;
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
