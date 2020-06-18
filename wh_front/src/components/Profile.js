import React, { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Profile = ({ history }) => {

  const [nickname, setNickname] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  function profileUpdate(){
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/user/profileUpdate`, { nickname, weight, goal })
        .then(res => { 
            console.log(res.data)
        })

  }

  return (
    <div>
      Profile
      <div>
        Nickname :
        <input
          name="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          autoFocus
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </div>
      <div>
        Weight :
        <input
          name="weight"
          type="weight"
          placeholder="몸무게를 입력하세요"
          onChange={(e) => setWeight(e.target.value)}
        ></input> kg
        <div>WHO 추천 일일섭취량 : { weight * 30 } ml </div>
        
      </div>
      <div>
        Goal :
        <input
          name="goal"
          type="text"
          placeholder="목표량을 입력하세요"
          onChange={(e) => setGoal(e.target.value)}
        ></input> ml
      </div>
      <button name="submit" onClick={profileUpdate}>
        Update
      </button>
      <button
        name="submit"
        onClick={() => {
          history.push("/userConsole");
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Profile;
