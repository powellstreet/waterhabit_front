import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  TextField,
  CssBaseline,
  InputAdornment,
  FormHelperText,
  Fab,
} from "@material-ui/core";
import { Mail } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import dotenv from "dotenv";

import MainBar from "./MainBar";
import LeftDrawer from "./LeftDrawer";

dotenv.config();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fab: {
    position: "fixed",
    bottom: "30%",
    right: "10%",
    zIndex: 1000,
  },
}));

const Profile = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let { nickname, weight, goal, userId } = useSelector((state) => ({
    nickname: state.nickname,
    weight: state.weight,
    goal: state.goal,
    userId: state.userId,
  }));

  const [nicknameValue, setNicknameValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [goalValue, setGoalValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (bln) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setDrawerOpen(bln);
  };

  function profileUpdate() {
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/user/profileUpdate`,
        {
          userId,
          nickname: nicknameValue,
          weight: weightValue,
          goal: goalValue,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "nickname", nickname: nicknameValue });
        dispatch({ type: "weight", weight: weightValue });
        dispatch({ type: "goal", goal: goalValue });
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainBar history={history} />
      <LeftDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} history={history} />

      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          color="textPrimary"
          align="center"
        >
          PROFILE
        </Typography>
        <form className={classes.form}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="nickname"
              name="nickname"
              label="닉네임"
              defaultValue={nickname}
              autoFocus
              onChange={(e) => setNicknameValue(e.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="weight"
              name="weight"
              label="체중"
              type="number"
              defaultValue={weight}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              onChange={(e) => setWeightValue(e.target.value)}
            />
          </div>

          <div>
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              id="goal"
              name="goal"
              label="목표량"
              defaultValue={goal}
              onChange={(e) => setGoalValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ml</InputAdornment>
                ),
              }}
            />
            <FormHelperText id="standard-weight-helper-text">
              * 체중에 따른 WHO 추천 일일섭취량 : {weight * 30} ml
            </FormHelperText>
          </div>
          <div>
            <Button
              name="submit"
              variant="outlined"
              color="primary"
              onClick={profileUpdate}
            >
              Update
            </Button>
            <Button
              name="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push("/userConsole");
              }}
            >
              Go BACK
            </Button>
            <Button
              name="drawerButton"
              color="primary"
              variant="outlined"
              onClick={toggleDrawer(true)}
            >
              Menu
            </Button>
          </div>
        </form>
      </div>
      <div>
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={toggleDrawer(true)}
        >
          <Mail />
        </Fab>
      </div>
    </div>
  );
};

export default Profile;
