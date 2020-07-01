import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Typography,
  TextField,
  Container,
  CssBaseline,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import {
  Email,
  Face,
  LockOpen,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";

import axios from "axios";
import dotenv from "dotenv";

import { chkEmail, chkPwd } from "../functions/functions";
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

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const { weight } = useSelector((state) => ({
    weight: state.weight,
  }));

  function goSignUp() {
    if (!chkEmail(email)) {
      alert("잘못된 이메일 형식입니다");
    } else if (!chkPwd(password)) {
      alert("비밀번호는 8~20자 길이의 영문, 숫자, 특수문자를 조합해주세요");
    } else {
      axios
        .post(`http://localhost:${process.env.REACT_APP_PORT}/user/signUp`, {
          email,
          password,
          nickname,
        })
        .then((res) => {
          console.log(res.data);
          if (!res.data.created) {
            alert("이미 존재하는 계정입니다");
          } else {
            // 로그인이 잘 되었으므로 home으로 redirection 주어야 함.
            history.push("/");
          }
        });
    }
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
          SIGN UP
        </Typography>
        <form className={classes.form}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              id="email"
              type="text"
              label="이메일"
              placeholder="이메일을 입력하세요"
              autoFocus
              required
              fullWidth
              autoComplete="password"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>

          <div>
            <TextField
              variant="outlined"
              margin="normal"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              id="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
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
            ></TextField>
            <FormHelperText id="standard-weight-helper-text">
              * 비밀번호는 8~20자 길이의 영문, 숫자, 특수문자를 조합해주세요
            </FormHelperText>
          </div>

          <div>
            <TextField
              variant="outlined"
              margin="normal"
              id="nickname"
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력하세요"
              required
              fullWidth
              onChange={(e) => setNickname(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Face />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>

          <div align="center">
            <Button
              name="submit"
              variant="outlined"
              color="primary"
              onClick={goSignUp}
            >
              Sign Up
            </Button>

            <Button
              name="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
