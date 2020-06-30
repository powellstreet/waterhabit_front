import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  TextField,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const useStyles = makeStyles((theme) => ({
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
    <Container maxWidth="xs">
      <CssBaseline />
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
              // required
              fullWidth
              id="nickname"
              name="nickname"
              label={`현재 닉네임 : ${nickname}`}
              // autoComplete="email"
              autoFocus
              onChange={(e) => setNicknameValue(e.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="weight"
              name="weight"
              label={`현재 몸무게 : ${weight}`}
              // autoComplete="email"
              onChange={(e) => setWeightValue(e.target.value)}
            />
            <div>
              * WHO 추천 일일섭취량 : {weightValue * 30} ml
              <Button
                name="goWHO"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setGoalValue(weightValue * 30);
                }}
              >
                추천대로 고!
              </Button>
            </div>
          </div>

          <div>
            <TextField
              variant="outlined"
              margin="normal"
              // required
              fullWidth
              id="goal"
              name="goal"
              label={`현재 목표량 : ${goal}`}
              value={goalValue}
              // autoComplete="email"
              onChange={(e) => setGoalValue(e.target.value)}
            />
          </div>

          {/* <div>
          Goal :
          <input
            name="goal"
            type="text"
            placeholder={goalValue}
            value={goalValue}
            onChange={(e) => setGoalValue(e.target.value)}
          ></input>{" "}
          ml
        </div> */}

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
        </form>
      </div>
    </Container>
  );
};

export default Profile;
