import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export default class FirebaseStore {
  count: number;

  constructor() {
    this.count = 0;
    makeObservable(this, {
      count: observable,
      increaseCount: action,
    });
  }

  increaseCount() {
    this.count++;
  }
}

export const FirebaseStoreContext = createContext(new FirebaseStore());
