import React, { createContext } from 'react';
import { action, makeObservable, observable } from 'mobx';
import conversationService from '../apis/conversation.service';

export default class ConversationStore {
  conversations: any[];
  totalCount: number;

  constructor() {
    this.conversations = [];
    this.totalCount = 0;
    makeObservable(this, {
      conversations: observable,
      totalCount: observable,
      setConversations: action,
      setTotalCount: action,
    });
  }

  setConversations(data: any[]) {
    this.conversations = data;
  }

  setTotalCount(count: number) {
    this.totalCount = count;
  }

  async get() {
    const { data, count } = await conversationService.get();
    this.setConversations(data);
    this.setTotalCount(count);
  }
}

export const ConversationStoreContext = createContext(new ConversationStore());
