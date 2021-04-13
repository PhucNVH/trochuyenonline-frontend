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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
