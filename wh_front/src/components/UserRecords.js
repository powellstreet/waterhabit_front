import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserRecords = ({ history }) => {
  const { nickname, stamp } = useSelector((state) => ({
    nickname: state.nickname,
    stamp: state.stamp
  }))

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
    </div>
  );
};

export default UserRecords;
