import * as firebase from 'firebase/app';
import 'firebase/messaging';

class FireBase {}

const config = {
  apiKey: 'AIzaSyD2BytZvoOh9qVQSV-z3xS6xwy4YcHZBts',
  authDomain: 'thesis-32c47.firebaseapp.com',
  databaseURL:
    'https://thesis-32c47-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'thesis-32c47',
  storageBucket: 'thesis-32c47.appspot.com',
  messagingSenderId: '228852574226',
  appId: '1:228852574226:web:e76850642fe69cd40250cb',
};

export const messaging = firebase.messaging.isSupported()
  ? firebase.initializeApp(config).messaging()
  : null;

export default new FireBase();
