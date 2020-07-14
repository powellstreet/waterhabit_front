import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Typography } from "@material-ui/core";
import { LocalDrink, Close } from "@material-ui/icons";

const Stamp = ({ day, intake }) => {
  // const { goal } = useSelector((state) => ({
  //   goal: state.goal
  // }))
  // 임시 목표치
  const goal = 2000;

  return (
    <div>
      {intake > goal ? (
        <div>
          <Typography>DAY {day}</Typography>
          <IconButton color="inherit">
            <LocalDrink />
          </IconButton>
        </div>
      ) : (
        <div>
          <Typography>DAY {day}</Typography>
          <IconButton color="inherit">
            <Close />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Stamp;