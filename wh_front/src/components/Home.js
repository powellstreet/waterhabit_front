import React from "react";
import UserConsole from "./UserConsole";
import axios from 'axios';
import SignUp from "./SignUp";

const Home = () => {
  return (
    <div>
      <div>
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력하세요"
          autoFocus
        ></input>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
        ></input>
        <button name="signIn"> Sign In </button>
      </div>

      <button name="signUp"> Sign Up </button>
      <SignUp/>
    </div>
  );
};

export default Home;
