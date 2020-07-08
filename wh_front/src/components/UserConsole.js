import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  TextField,
  CssBaseline,
  Grid,
  Fab,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Mail } from "@material-ui/icons";

import axios from "axios";
import dotenv from "dotenv";

import MainBar from "./MainBar";
import LeftDrawer from "./LeftDrawer";
import FloatButton from "./FloatButton";
dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    // display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  mainGrid: {
    marginTop: theme.spacing(3),
    // backgroundColor: 'grey'
  },
  fab: {
    position: "fixed",
    bottom: "30%",
    right: "10%",
    zIndex: 1000,
  },
}));

const UserConsole = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let { nickname, intake, goal, day, userId } = useSelector((state) => ({
    nickname: state.nickname,
    intake: state.intake,
    goal: state.goal,
    day: state.day,
    userId: state.userId,
  }));

  const [addIntake, setAddIntake] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (bln) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setDrawerOpen(bln);
  };

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
      <CssBaseline />
      <MainBar history={history} />
      <LeftDrawer
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        history={history}
      />

      <div className={classes.paper}>
        <Grid container spacing={3} className={classes.mainGrid}>
          <Grid item xs={12} style={{ backgroundColor: "red" }}>
            {nickname}님 안녕하세요! 목표까지 {100 - day}일 남았습니다!
          </Grid>

          <Grid item xs={6} style={{ backgroundColor: "ivory" }}>
            <div>
              <div>
                물 추가하기
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="addWater"
                  name="addWater"
                  type="number"
                  label="물 추가하기"
                  onChange={(e) => setAddIntake(e.target.value)}
                ></TextField>
                <Button
                  name="addWaterBtn"
                  color="primary"
                  variant="outlined"
                  onClick={updateTotalIntake}
                >
                  추가
                </Button>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "yellow",
                width: "20%",
                flexDirection: "column",
              }}
            ></div>
          </Grid>

          <Grid item xs={6} style={{ backgroundColor: "gold" }}>
            <div>오늘의 목표 : {goal} ml</div>
            <div>현재까지 마신 물 : {intake} ml</div>
            <div>오늘의 목표 달성률 : {ratio} %</div>
            <div>
              <div
                style={{
                  backgroundColor: "blue",
                  width: `${ratio}%`,
                  height: 100,
                }}
              ></div>
            </div>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={3}>
              <div>
                <Button
                  name="drawerButton"
                  color="primary"
                  variant="outlined"
                  onClick={toggleDrawer(true)}
                >
                  Menu
                </Button>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Button
                  name="drawerButton"
                  color="primary"
                  variant="outlined"
                  onClick={toggleDrawer(true)}
                >
                  Menu
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography paragraph>
              This being human is a guest house. Every morning a new arrival. A
              joy, a depression, a meanness, some momentary awareness comes as
              an unexpected visitor. Welcome and entertain them all! Even if
              they’re a crowd of sorrows, who violently sweep your house empty
              of its furniture, still, treat each guest honorably. He may be
              clearing you out for some new delight. The dark thought, the
              shame, the malice, meet them at the door laughing, and invite them
              in. Be grateful for whoever comes, because each has been sent as a
              guide from beyond.
            </Typography>
          </Grid>
        </Grid>
      </div>
      <FloatButton toggleDrawer={toggleDrawer} />

    </div>
  );
};

export default UserConsole;
