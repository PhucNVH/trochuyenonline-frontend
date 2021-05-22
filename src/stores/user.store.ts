import { createContext } from 'react';
import { action, makeObservable, observable } from 'mobx';
import userService from '../apis/user.service';
import { BecomeExpert } from '../dto/expert/BecomeExpert.dto';

export default class UserStore {
  users: any[];
  expertList: any[];

  constructor() {
    this.users = [];
    this.expertList = [];
    makeObservable(this, {
      users: observable,
      expertList: observable,
      setExpertList: action,
    });
  }

  setExpertList(result: any[]) {
    this.expertList = result;
  }

  async uploadAvatar(model: Record<string, any>) {
    return await userService.uploadAvatar(model);
  }

  async getUser(token: string) {
    const result = await userService.getUser(token);
    return result;
  }

  async registerToken(token: string) {
    const result = await userService.registerToken(token);
    return result;
  }

  async becomeExpert(model: BecomeExpert) {
    const result = await userService.becomeExpert(model);
    return result;
  }

  async getListExpert() {
    const result = await userService.getListExpert();
    this.setExpertList(result);
  }
}

export const UserStoreContext = createContext(new UserStore());
