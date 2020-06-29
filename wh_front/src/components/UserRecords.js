import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";
import Stamp from './Stamp';

dotenv.config();

const UserRecords = ({ history }) => {
  const [records, setRecords] = useState([]);
  const [yesDays, setYesDays] = useState(0);

  const { userId, nickname, stamp, goal } = useSelector((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    stamp: state.stamp,
    goal: state.goal,
  }))

  useEffect(() => {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/getStamp`, { userId })
      .then((res) => {
        // let rc = []; rc.length = 100; rc.fill(0);
        // res.data.forEach((el) => { rc[Number(el.day) - 1] = 1 })
        // setRecords(rc);
        // setYesDays(res.data.length);
        // console.log(rc)
        let rc = []; rc.length = 100; rc.fill(0);
        res.data.forEach((el) => { rc[Number(el.day) - 1] = el.intake })
        setRecords(rc);
        setYesDays(res.data.length);
        console.log(rc)
      });
  }, [])

  return (
    <div>
      UserRecords
      <div>
        <div>{nickname}님 화이팅입니다</div>
        <div>stamps : {stamp}</div>
        <button
          name="goUserConsole"
          onClick={() => history.push('/userConsole')}
        >
          Go UserConsole!
        </button>
      </div>
      <div>성공률 : {yesDays} % </div>
      {
        records.map((el, idx) => {
          return el >= goal ? <div key={idx}>{el}</div> : <div key={idx}>{el}</div>;
        })
      }

    </div>
  );
};

export default UserRecords;
