import React, { useState } from "react";
import UserConsole from "./UserConsole";
import SignUp from "./SignUp";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goSignIn() {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/user/signIn`, { email, password })
      .then(res => console.log(res.data))
  }

  return (
    <div>
      {/* <div>
        <div>
          Email :
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력하세요"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          Password :
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button name="signIn" onClick={goSignIn}> Sign In </button>
      </div> */}

      <button name="signUp"> Sign Up </button>
      <SignUp />
      {/* <UserConsole/> */}
    </div>
  );
};

export default Home;
