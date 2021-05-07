import React from 'react';
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
    return await userService.getUser(token);
  }

  async registerToken(token: string) {
    const result = await userService.registerToken(token);
    return result;
  }
}

export const UserStoreContext = React.createContext(new UserStore());
