import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";

import UserRecords from "./UserRecords";
import UserRecordsContainer from "../containers/UserRecordsContainer"
import Profile from "./Profile";
import WholeRecords from "./WholeRecords";

dotenv.config();

const UserConsole = ({ history }) => {
  const dispatch = useDispatch();
  let { nickname, intake, goal, day } = useSelector((state) => ({
    nickname: state.nickname,
    intake: state.intake,
    goal: state.goal,
    day: state.day,
  }))

  const [addIntake, setAddIntake] = useState(0);

  const ratio = Math.floor(intake / goal * 100);

  const updateTotalIntake = () => {
    let updatedTotal = Number(intake) + Number(addIntake);
    if(updatedTotal >= goal ){
      console.log('목표를 달성했습니다')
    }
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/user/intakeUpdate`, { intake: updatedTotal, day })
      .then(res => { 
        console.log(res.data)
        dispatch({type: 'intake', intake: updatedTotal})
      }) 
  };

  const updateStamp = () => {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/updateStamp`, { day: String(day) })
      .then(res => console.log(res.data))
  }

  return (

    <div>
      UserConsole
      <h2>{nickname}님 안녕하세요! 목표까지 {100 - day}일 남았습니다! </h2>
      <div>물 추가하기
          <input name="addWater" type="text" placeholder="물한잔" onChange={(e) => setAddIntake(e.target.value)}></input>
          <button name="addWaterBtn" onClick={updateTotalIntake}>추가</button>
      </div>
      <div>
          오늘의 목표 : {goal} ml
      </div>
      <div>
          현재까지 마신 물 : {intake} ml
      </div>
      <div>
          오늘의 목표 달성률 : {ratio} %
      </div>
      <div>
        <button name="profile" onClick={() => history.push("/profile")}>
          프로필
        </button>
      </div>
      <div>
          <button name="goUserRecords" onClick={() => history.push('/userRecords')}>My Record</button>
      </div>
      <div>
        <button name="goWholeRecords" onClick={() => history.push('/wholeRecords')}>Whole Records</button>
      </div>
      
      <div style={{ backgroundColor: 'skyblue', width : `${ratio}%`, height: 100}}></div>


      <div>
        <button name="goWholeRecords" onClick={updateStamp}>updateStamp test!</button>
      </div>

    </div>

  );
};

export default UserConsole;
