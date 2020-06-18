import React, { useState } from "react";
import UserConsole from "./UserConsole";
import SignUp from "./SignUp";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Home = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goSignIn() {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/user/signIn`, { email, password })
      .then(res => {
        console.log(res.data)
        if(res.data.token){
          // 받아온 token state로 저장하는 작업 필요
          history.push('/userConsole')
        } else {
          alert('로그인 정보가 맞지 않습니다')
        }
      })
  }

  return (
    <div>
      <div>MAIN</div>
      <div>
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
      </div>

      <button name="signUp" onClick={() => { history.push('/signUp')}}> Go Sign Up! </button>
      {/* <SignUp /> */}
      {/* <UserConsole/> */}
    </div>
  );
};

export default Home;
