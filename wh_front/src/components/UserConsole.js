import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  TextField,
  CssBaseline,
  Grid,
  ListItemSecondaryAction,
  CircularProgress,
  LinearProgress,
  Box,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";
import { Mail } from "@material-ui/icons";

import axios from "axios";
import dotenv from "dotenv";

import MainBar from "./MainBar";
import LeftDrawer from "./LeftDrawer";
import FloatButton from "./FloatButton";
import StatusCard from "./StatusCard";
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
    background: "pink",
    // background: "linear-gradient(45deg, blue 5%, skyblue 90%)",
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
  media: {
    height: 50,
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

  const cups = [
    { ml: "200ml" },
    { ml: "250ml (잔)" },
    { ml: "300ml (컵)" },
    { ml: "400ml" },
    { ml: "500ml" },
  ];

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
          <Grid item xs={12} style={{ backgroundColor: "white" }}>
            <div>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  {/* <LinearProgress variant="determinate" /> */}
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${ratio}%`}</Typography>
                </Box>
              </Box>
            </div>
          </Grid>

          <Grid item xs={6} style={{ backgroundColor: "gold" }}>
            <Card>
              {/* <CardActionArea> */}
              <CardMedia
                image="../images/sample.png"
                title="Contemplative Reptile"
                className={classes.media}
              ></CardMedia>

              <CardContent>
                <Typography>오늘의 목표 : {goal} ml</Typography>
                <Typography>현재까지 마신 물 : {intake} ml</Typography>
                <Typography> 물 추가하기</Typography>
                <div>
                  <Autocomplete
                    options={cups}
                    getOptionLabel={(option) => option.ml}
                    // style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="ml" variant="outlined" />
                    )}
                    onInputChange={(event, value) => {
                      value = Number(value.substring(0, 3));
                      setAddIntake(value);
                    }}
                  />
                  <Button
                    name="addWaterBtn"
                    color="primary"
                    variant="outlined"
                    onClick={updateTotalIntake}
                  >
                    추가
                  </Button>
                </div>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </Grid>

          {/* AutoComplete 사용해서 추가하는 물 양 선택할 수 있도록 수정하기 */}

          <Grid item xs={6} style={{ backgroundColor: "orange" }}>
            <Card>
              <CardMedia
                image="../images/sample.png"
                title="Contemplative Reptile"
                className={classes.media}
              ></CardMedia>
              <CardContent>
                <Typography>오늘의 목표 달성률 : {ratio} %</Typography>
                <StatusCard status={ratio} />
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={6} ></Grid> */}
          <Grid item xs={12} style={{ backgroundColor: "white" }}>
            <Card>
              <CardContent>
                <div>
                  <div
                    style={{
                      background:
                        "linear-gradient(45deg, blue 5%, skyblue 90%)",
                      width: `${ratio}%`,
                      height: 100,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
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
