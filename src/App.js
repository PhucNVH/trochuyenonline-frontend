import './App.css';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Home, Login, Signup, Survey, Test } from './pages';
import { ProvideAuth, useAuth } from './hooks/use-auth';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import PolicyPage from '../src/components/Policy';

function AuthorizedRoute({ path, children }) {
  const auth = useAuth();
  return (
    <Route path={path}>{auth.user ? children : <Redirect to="/login" />}</Route>
  );
}

function UnauthorizedRoute({ path, children }) {
  const auth = useAuth();
  return (
    <Route path={path}>{auth.user ? <Redirect to="/chat" /> : children}</Route>
  );
}

function App() {
  return (
    <ProvideAuth>
      <div>
        <ToastContainer limit={1} />
      </div>
      <Router>
        <Switch>
          <UnauthorizedRoute path="/login">
            <Login />
          </UnauthorizedRoute>
          <UnauthorizedRoute path="/signup">
            <Signup />
          </UnauthorizedRoute>
          <AuthorizedRoute path="/chat">
            <Chat />
          </AuthorizedRoute>
          <AuthorizedRoute path="/survey">
            <Survey />
          </AuthorizedRoute>
          <UnauthorizedRoute path="/policies">
            <PolicyPage />
          </UnauthorizedRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
