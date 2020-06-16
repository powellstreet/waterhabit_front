import React, { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// require("dotenv").config();

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  function submitSignUp() {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/user/signUp`, {
        email,
        password,
        nickname,
      })
      .then((data) => console.log(data.data));
  }

  return (
    <div>
      <input
        name="email"
        type="text"
        placeholder="이메일을 입력하세요"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        name="nickname"
        type="text"
        placeholder="닉네임을 입력하세요"
        onChange={(e) => setNickname(e.target.value)}
      ></input>
      <button name="submit" onClick={submitSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
