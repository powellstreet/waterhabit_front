import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserRecords from "./UserRecords";
import UserRecordsContainer from "../containers/UserRecordsContainer"
import Profile from "./Profile";
import WholeRecords from "./WholeRecords";

const UserConsole = ({ history }) => {
  const dispatch = useDispatch();
  // goal 을 state로 받아와서 사용해야 함. 일단은 하드코딩
  let { nickname, goal } = useSelector((state) => ({
    nickname: state.nickname,
    goal: state.goal,
  }))

  const [intake, setIntake] = useState(0);
  const [totalIntake, setTotalIntake] = useState(0);

  const ratio = Math.floor(totalIntake / goal * 100);

  return (
    <div>
      UserConsole
      <div>{nickname}님 안녕하세요! </div>
      <div>물 추가하기
          <input name="addWater" type="text" placeholder="물한잔" onChange={(e) => setIntake(e.target.value)}></input>
          <button name="addWaterBtn" onClick={() => setTotalIntake(Number(totalIntake) + Number(intake))}>추가</button>
      </div>
      <div>
          오늘의 목표 : {goal} ml
      </div>
      <div>
          현재까지 마신 물 : {totalIntake} ml
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
        <button name="test" onClick={() => dispatch({ type: 'goal', goal: 777})}>칠칠칠로 바꿔보자</button>
      </div>

    </div>
  );
};

export default UserConsole;
