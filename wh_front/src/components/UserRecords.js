import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";

import WholeRecords from './WholeRecords';

dotenv.config();

const UserRecords = ({ history }) => {
  const [records, setRecords] = useState([]);

  const { userId, nickname, stamp } = useSelector((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    stamp: state.stamp,
  }))

  useEffect(() => {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/getStamp`, { userId })
      .then((res) => {
        let rc = [];
        res.data.forEach((el) => { rc[Number(el.day) - 1] = true })
        setRecords(rc);
      });
  }, [])

  console.log('these are records : ', records)
  let test = [3, 1, 2, 5];

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
      {
        test.map((el, idx) => (
          <div key={idx}> {String(el)}</div>
        ))
      }

    </div>
  );
};

export default UserRecords;
