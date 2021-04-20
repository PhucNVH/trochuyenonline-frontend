import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import { Message } from '../dto/messages/Message.dto';
import messageService from '../apis/message.service';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';
import conversationService from '../apis/conversation.service';

export default class MessageStore {
  messages: Message[];
  totalCount: number;

  constructor() {
    this.messages = [];
    this.totalCount = 0;
    makeObservable(this, {
      messages: observable,
      totalCount: observable,
      setMessages: action,
      setTotalCount: action,
    });
  }

  setMessages(data: Message[]) {
    this.messages = data;
  }

  setTotalCount(count: number) {
    this.totalCount = count;
  }

  async getConversation(conversationId: number, model: PaginationRequest) {
    const { data, count } = await messageService.getConversation(
      conversationId,
      model
    );
    this.setMessages(data);
    this.setTotalCount(count);
  }
}

export const MessageStoreContext = React.createContext(new MessageStore());
