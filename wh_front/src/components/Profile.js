import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Profile = ({ history }) => {
  const dispatch = useDispatch();

  let { nickname, weight, goal } = useSelector((state) => ({
    nickname: state.nickname,
    weight: state.weight,
    goal: state.goal
  }))

  const [nicknameValue, setNicknameValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [goalValue, setGoalValue] = useState("");


  function profileUpdate(){
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/user/profileUpdate`, { 
      nickname: nicknameValue, 
      weight: weightValue, 
      goal: goalValue 
    })
      .then(res => { 
          console.log(res.data)
          dispatch({ type: 'nickname', nickname: nicknameValue});
          dispatch({ type: 'weight', weight: weightValue});
          dispatch({ type: 'goal', goal: goalValue});
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
          placeholder={nickname}
          autoFocus
          onChange={(e) => setNicknameValue(e.target.value)}
        ></input>
      </div>
      <div>
        Weight :
        <input
          name="weight"
          type="weight"
          placeholder={weight}
          onChange={(e) => setWeightValue(e.target.value)}
        ></input> kg
        <div>* WHO 추천 일일섭취량 : { weightValue * 30 } ml  
          <button name="goWHO" onClick={() => {setGoalValue( weightValue * 30 )}}>추천대로 고고</button>
        </div>
        
      </div>
      <div>
        Goal :
        <input
          name="goal"
          type="text"
          placeholder={goalValue}
          value={goalValue}
          onChange={(e) => setGoalValue(e.target.value)}
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
