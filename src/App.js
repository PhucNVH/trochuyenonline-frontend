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
        <ToastContainer />
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
          <Route path="/test">
            <Test />
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
