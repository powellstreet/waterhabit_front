import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";

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
        let instance = res.data.instance;
        if (res.data.token) {
          dispatch({ type: "token", token: res.data.token });
          dispatch({ type: "goal", goal: instance.goal });
          dispatch({ type: "intake", intake: instance.intake });
          dispatch({ type: "likes", likes: instance.likes });
          dispatch({ type: "nickname", nickname: instance.nickname });
          dispatch({ type: "point", point: instance.point });
          dispatch({ type: "weight", weight: instance.weight });
          dispatch({ type: "stamp", stamp: instance.stamp });
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
      {/* <button name="test" onClick={() => {
        store.dispatch({type:'weight', weight })
      }}> Go Redux Test! </button> */}

      {/* <button name="test" onClick={() => {
        dispatch({ type : 'weight', weight : 9999})
      }} > Dispatch Redux! </button>
      
      <button name="test" onClick={() => {
        store.dispatch({type:'weight', weight : weight + 10 })
      }}> Plus 10 Redux! </button> */}

      {/* <SignUp /> */}
      {/* <UserConsole/> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    number: state.counter.number,
    color: state.ui.color,
  };
};

export default Home;
