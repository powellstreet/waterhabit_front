import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "@material-ui/core";
import { AccountCircle, LocalDrink } from "@material-ui/icons";

const Stamp = ({ day, intake }) => {

  // const { goal } = useSelector((state) => ({
  //   goal: state.goal
  // }))
  // 임시 목표치
  const goal = 2000

  if (intake > goal) {
    return (
      <div>
        {day} 목표 달성!
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </div>
    );
  } else {
    return (
      <div>
        {day} 더 드시지 좀...
        <IconButton color="inherit">
          <LocalDrink />
        </IconButton>
      </div>
    );
  }
};

export default Stamp;
