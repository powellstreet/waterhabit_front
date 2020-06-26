import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";
import { dayCounter, toDate } from "../functions/functions";

dotenv.config();

const Home = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  function goSignIn() {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/user/signIn`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        const instance = res.data.instance;
        if (res.data.token) {
          // const startDay = toDate(instance.createdAt);
          dispatch({ type: "token", token: res.data.token });
          dispatch({ type: "userId", userId: instance.id });
          dispatch({ type: "goal", goal: instance.goal });
          dispatch({ type: "intake", intake: instance.intake });
          dispatch({ type: "likes", likes: instance.likes });
          dispatch({ type: "nickname", nickname: instance.nickname });
          dispatch({ type: "point", point: instance.point });
          dispatch({ type: "weight", weight: instance.weight });
          dispatch({ type: "day", day: dayCounter(toDate(instance.createdAt)) });
          history.push("/userConsole");
        } else {
          alert("로그인 정보가 맞지 않습니다");
        }
      });
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
        <button name="signIn" onClick={goSignIn}>
          {" "}
          Sign In{" "}
        </button>
      </div>

      <button
        name="signUp"
        onClick={() => {
          history.push("/signUp");
        }}
      >
        {" "}
        Go Sign Up!{" "}
      </button>
    </div>
  );
};

export default Home;