import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import UserConsole from "./components/UserConsole";
import UserRecords from "./components/UserRecords";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/userConsole" component={UserConsole} />
          <Route path="/profile" component={Profile} />
          <Route path="/userRecords" component={UserRecords} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
