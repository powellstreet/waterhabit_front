import React, { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

import { chkEmail, chkPwd } from "../functions/verification";
dotenv.config();

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  function goSignUp() {
    if (!chkEmail(email)) {
      alert("잘못된 이메일 형식입니다");
    } else if (!chkPwd(password)) {
      alert("비밀번호는 8~20자 길이의 영문, 숫자, 특수문자를 조합해주세요");
    } else {
      axios
        .post(`http://localhost:${process.env.REACT_APP_PORT}/user/signUp`, {
          email,
          password,
          nickname,
        })
        .then((res) => {
          console.log(res.data);
          if (!res.data.created) {
            alert("이미 존재하는 계정입니다");
          } else {
            // 로그인이 잘 되었으므로 home으로 redirection 주어야 함.
            history.push("/");
          }
        });
    }
  }

  return (
    <div>
      SIGN UP
      <div>
        Email :
        <input
          name="email"
          type="text"
          placeholder="이메일을 입력하세요"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        Password :
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        Nickname :
        <input
          name="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </div>
      <button name="submit" onClick={goSignUp}>
        Sign Up
      </button>
      <button
        name="submit"
        onClick={() => {
          history.push("/");
        }}
      >
        Go Main!
      </button>
    </div>
  );
};

export default SignUp;
