import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toDate } from "../functions/functions";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const UserConsole = ({ history }) => {
  const dispatch = useDispatch();
  let { nickname, intake, goal, day, userId, updated } = useSelector((state) => ({
    nickname: state.nickname,
    intake: state.intake,
    goal: state.goal,
    day: state.day,
    userId: state.userId,
  }))

  const [addIntake, setAddIntake] = useState(0);

  const ratio = Math.floor(intake / goal * 100);

  const updateTotalIntake = () => {
    let updatedTotal = Number(intake) + Number(addIntake);
    if(updatedTotal >= goal ){
      console.log('목표를 달성했습니다')
      updateStamp();
    }

    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/updateIntake`, { intake: updatedTotal, day, userId })
      .then(res => { 
        console.log(res.data)
        dispatch({type: 'intake', intake: updatedTotal});
      }) 
  };

  const updateStamp = () => {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/updateStamp`, { userId, day })
      .then(res => console.log(res.data))
  }

  useEffect(() => {
    // 오늘 day 기준으로 record 컬럼 없으면 하나 만들어주고 있으면 거기서 intake값 받아오기 (findOrCreate)
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/checkIntake`, { userId, day })
      // .then((res) => console.log(res.data))
      .then((res) => dispatch({type: 'intake', intake: res.data.instance.intake}))
  }, []);
  
  return (

    <div>
      UserConsole
      <h2>{nickname}님 안녕하세요! 목표까지 {100 - day}일 남았습니다!</h2>
      <div>userId : {userId}</div>
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
