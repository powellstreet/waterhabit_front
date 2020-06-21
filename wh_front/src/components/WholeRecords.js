import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const WholeRecords = ({ history }) => {
    const { nickname } = useSelector((state) => ({
        nickname: state.nickname
    }))

    return (
        <div>
            WholeRecords
            <div>{nickname}님 동료들도 함께합니다!</div>
            <div>
                <button name="goUserConsole" onClick={() => history.push('./userConsole')}>Go to UserConsole!</button>
            </div>
        </div>
    )
}

export default WholeRecords;
