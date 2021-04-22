import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import personalityService from '../apis/personality.service';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';

export default class PersonalityStore {
  personalities: any[];
  totalCount: number;

  constructor() {
    this.personalities = [];
    this.totalCount = 0;
    makeObservable(this, {
      personalities: observable,
      totalCount: observable,
      setPersonalities: action,
      setTotalCount: action,
    });
  }

  setPersonalities(data: any[]) {
    this.personalities = data;
  }

  setTotalCount(count: number) {
    this.totalCount = count;
  }

  async get(model: PaginationRequest) {
    const { data, count } = await personalityService.get(model);
    this.setPersonalities(data);
    this.setTotalCount(count);
  }

  async remove(id: number) {
    const result = await personalityService.remove(id);
  }
}

export const PersonalityStoreContext = React.createContext(
  new PersonalityStore()
);
