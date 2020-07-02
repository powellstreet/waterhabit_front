import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  Typography,
  TextField,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const UserConsole = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let { nickname, intake, goal, day, userId, updated } = useSelector(
    (state) => ({
      nickname: state.nickname,
      intake: state.intake,
      goal: state.goal,
      day: state.day,
      userId: state.userId,
    })
  );

  const [addIntake, setAddIntake] = useState(0);

  const ratio = Math.floor((intake / goal) * 100);

  const updateTotalIntake = () => {
    let updatedTotal = Number(intake) + Number(addIntake);
    if (updatedTotal >= goal) {
      console.log("목표를 달성했습니다");
      updateStamp();
    }

    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/records/updateIntake`,
        { intake: updatedTotal, day, userId }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "intake", intake: updatedTotal });
      });
  };

  const updateStamp = () => {
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/records/updateStamp`,
        { userId, day }
      )
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    // 오늘 day 기준으로 record 컬럼 없으면 하나 만들어주고 있으면 거기서 intake값 받아오기 (findOrCreate)
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/records/checkIntake`,
        { userId, day }
      )
      // .then((res) => console.log(res.data))
      .then((res) =>
        // userConsole 할때만 잠깐 수정!
        // dispatch({ type: "intake", intake: res.data.instance.intake })
        dispatch({ type: "intake", intake: 0 })
      );
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton}>
            <Menu></Menu>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            100일간의 물마시기 습관, WaterHabit
          </Typography>
          <Button color="inherit"> Sign Out </Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          color="textPrimary"
          align="center"
        >
          {nickname}님 안녕하세요! 목표까지 {100 - day}일 남았습니다!
        </Typography>
        <div>
          물 추가하기
          <input
            name="addWater"
            type="text"
            placeholder="물한잔"
            onChange={(e) => setAddIntake(e.target.value)}
          ></input>
          <Button
            name="addWaterBtn"
            color="primary"
            variant="outlined"
            onClick={updateTotalIntake}
          >
            추가
          </Button>
        </div>
        <div>오늘의 목표 : {goal} ml</div>
        <div>현재까지 마신 물 : {intake} ml</div>
        <div>오늘의 목표 달성률 : {ratio} %</div>
        <div>
          <Button
            name="profile"
            color="primary"
            variant="outlined"
            onClick={() => history.push("/profile")}
          >
            프로필
          </Button>
          <Button
            name="goUserRecords"
            color="primary"
            variant="outlined"
            onClick={() => history.push("/userRecords")}
          >
            My Record
          </Button>
          <Button
            name="goWholeRecords"
            color="primary"
            variant="outlined"
            onClick={() => history.push("/wholeRecords")}
          >
            Whole Records
          </Button>
        </div>
        <div
          style={{
            backgroundColor: "skyblue",
            width: `${ratio}%`,
            height: 100,
          }}
        ></div>
      </div>
    </div>
  );
};

export default UserConsole;
