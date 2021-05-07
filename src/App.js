import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Home, Login, Signup, Survey } from './pages';
import { ProvideAuth, useAuth } from './hooks/use-auth';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import PolicyPage from '../src/components/Policy';
import TermPage from '../src/components/TermPage';
import { messaging } from './utils/firebase.util';
import React from 'react';
import NotificationStoreContext from './stores/notification.store';
import FirebaseStoreContext from './stores/firebase.store';
import { saveToStorage, retrieveFromStorage } from './utils/storage.util';
import { LOCAL_STORAGE_KEY } from './dto/constants/local-storage.constants';
import userService from './apis/user.service';

function AuthorizedRoute({ path, children }) {
  const auth = useAuth();
  return (
    <Route path={path}>
      {auth.user ? children : <Redirect to="/dang-nhap" />}
    </Route>
  );
}

function UnauthorizedRoute({ path, children }) {
  const auth = useAuth();
  return (
    <Route path={path}>
      {auth.user ? <Redirect to="/tro-chuyen" /> : children}
    </Route>
  );
}

function App() {
  const firebaseStore = React.useContext(FirebaseStoreContext);
  const notiStore = React.useContext(NotificationStoreContext);

  if ('serviceWorker' in navigator) {
    // Supported!
    navigator.serviceWorker.addEventListener('message', (message) => {
      console.log(' ======== ', notiStore);
      notiStore.getNotiList();
    });
  }
  React.useEffect(() => {
    if (messaging) {
      messaging
        .getToken()
        .then((token) => {
          saveToStorage(LOCAL_STORAGE_KEY.DEVICE_TOKEN, token);
        })
        .catch((e) => {
          console.error(e);
          console.error('Permission notification - Granted');
        });
    }
  }, [firebaseStore]);

  React.useEffect(() => {
    const deviceId = retrieveFromStorage(LOCAL_STORAGE_KEY.DEVICE_TOKEN);
    if (deviceId) {
      console.log({ deviceId });
      userService.registerToken(deviceId);
    }
  }, []);

  return (
    <ProvideAuth>
      <div>
        <ToastContainer limit={1} />
      </div>
      <Router>
        <Switch>
          <UnauthorizedRoute path="/dang-nhap">
            <Login />
          </UnauthorizedRoute>
          <UnauthorizedRoute path="/dang-ky">
            <Signup />
          </UnauthorizedRoute>
          <AuthorizedRoute path="/tro-chuyen">
            <Chat />
          </AuthorizedRoute>
          <AuthorizedRoute path="/khao-sat">
            <Survey />
          </AuthorizedRoute>
          <Route path="/chinh-sach">
            <PolicyPage />
          </Route>
          <Route path="/dieu-khoan">
            <TermPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
