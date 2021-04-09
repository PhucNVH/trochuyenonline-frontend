import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Chat, Login, Signup, Survey } from "./pages";
import { ProvideAuth, useAuth } from "./hooks/use-auth";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/survey">
            <Survey />
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
