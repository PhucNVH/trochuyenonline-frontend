import { action, makeObservable, observable } from 'mobx';
import React from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/use-auth';
export default class SocketStore {
  socket: any;

  constructor() {
    this.socket = io.connect(process.env.REACT_APP_SOCKET_URI || '3131');
    makeObservable(this, {
      socket: observable,
      handleConnectSocket: action,
    });
  }

  handleConnectSocket() {
    this.socket = io.connect(process.env.REACT_APP_SOCKET_URI || '3131');
  }
}

export const SocketStoreContext = React.createContext(new SocketStore());
