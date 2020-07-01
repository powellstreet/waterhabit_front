import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  TextField,
  Container,
  CssBaseline,
  InputAdornment,
} from "@material-ui/core";
import {
  Email,
  LockOpen,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";

import axios from "axios";
import dotenv from "dotenv";
import { dayCounter, toDate } from "../functions/functions";
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

const Home = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  function goSignIn() {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/user/signIn`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        const instance = res.data.instance;
        if (res.data.token) {
          dispatch({ type: "token", token: res.data.token });
          dispatch({ type: "userId", userId: instance.id });
          dispatch({ type: "goal", goal: instance.goal });
          dispatch({ type: "intake", intake: instance.intake });
          dispatch({ type: "likes", likes: instance.likes });
          dispatch({ type: "nickname", nickname: instance.nickname });
          dispatch({ type: "point", point: instance.point });
          dispatch({ type: "weight", weight: instance.weight });
          dispatch({
            type: "day",
            day: dayCounter(toDate(instance.createdAt)),
          });
          history.push("/userConsole");
        } else {
          alert("로그인 정보가 맞지 않습니다");
        }
      });
  }

  return (
    <Container maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          color="textPrimary"
          align="center"
        >
          WATERHABIT MAIN
        </Typography>
        <form className={classes.form}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="이메일을 입력하세요"
              // autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              id="password"
              name="password"
              label="비밀번호를 입력하세요"
              autoComplete="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpen />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div align="center">
            <Button
              name="signIn"
              color="primary"
              onClick={goSignIn}
              variant="outlined"
            >
              {" "}
              Sign In{" "}
            </Button>

            <Button
              name="signUp"
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/signUp");
              }}
            >
              {" "}
              Sign Up{" "}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Home;
