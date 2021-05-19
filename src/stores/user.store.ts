import { createContext } from 'react';
import { makeObservable, observable } from 'mobx';
import userService from '../apis/user.service';

export default class UserStore {
  users: any[];

  constructor() {
    this.users = [];
    makeObservable(this, {
      users: observable,
    });
  }

  async uploadAvatar(model: Record<string, any>) {
    return await userService.uploadAvatar(model);
  }

  async getUser(token: string) {
    const result = await userService.getUser(token);
    console.log({ result });

    return result;
  }

  async registerToken(token: string) {
    const result = await userService.registerToken(token);
    return result;
  }
}

export const UserStoreContext = createContext(new UserStore());
