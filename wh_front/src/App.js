import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/Home";
import SignUp from "./components/SignUp";
import UserConsole from "./components/UserConsole";
import UserRecords from "./components/UserRecords";
import WholeRecords from "./components/WholeRecords";
import Profile from "./components/Profile";
import MainBar from "./components/MainBar";
import Footer from "./components/Footer";
import SpeedDialButton from "./components/SpeedDialButton";

function App() {

  // const { isLogin } = useSelector((state) => ({
  //   isLogin: state.isLogin
  // }))
  
  // 작업하는 동안만 true 설정
  const isLogin = true;

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/userConsole" component={UserConsole} />
          <Route path="/profile" component={Profile} />
          <Route path="/userRecords" component={UserRecords} />
          <Route path="/wholeRecords" component={WholeRecords} />
          <Route path="/mainBar" component={MainBar} />
        </Switch>
        <Footer />
        {isLogin ? <SpeedDialButton /> : null}
        
      </div>
    </BrowserRouter>
  );
}

export default App;
