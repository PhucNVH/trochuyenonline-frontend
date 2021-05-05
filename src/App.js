import './App.css';
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
import TermPage from '../src/components/TermPage';

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
