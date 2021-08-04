import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./pages/Post";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/404";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/post/:id" component={Post} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
