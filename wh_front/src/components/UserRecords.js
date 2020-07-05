import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Typography,
  CssBaseline,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Mail,
  MoveToInbox,
} from "@material-ui/icons";
import axios from "axios";
import dotenv from "dotenv";
import Stamp from "./Stamp";
import MainBar from "./MainBar";

dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
}));

const UserRecords = ({ history }) => {
  const [records, setRecords] = useState([]);
  const [yesDays, setYesDays] = useState(0);
  const [stampType, setStampType] = useState("stamp");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const { userId, nickname, stamp, goal } = useSelector((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    stamp: state.stamp,
    goal: state.goal,
  }));

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleStampType = (e) => {
    setStampType(e.target.checked);
  };

  useEffect(() => {
    axios
      .post(`http://localhost:${process.env.REACT_APP_PORT}/records/getStamp`, {
        userId,
      })
      .then((res) => {
        // let rc = []; rc.length = 100; rc.fill(0);
        // res.data.forEach((el) => { rc[Number(el.day) - 1] = 1 })
        // setRecords(rc);
        // setYesDays(res.data.length);
        // console.log(rc)
        let rc = [];
        rc.length = 100;
        rc.fill(0);
        res.data.forEach((el) => {
          rc[Number(el.day) - 1] = el.intake;
        });
        setRecords(rc);
        setYesDays(res.data.length);
        console.log(rc);
      });
  }, []);

  return (
    <div>
      <CssBaseline />
      <MainBar history={history}/>

      <div>
        <div>{nickname}님 화이팅입니다</div>
        <div>stamps : {stamp}</div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                // checked={auth}
                onChange={handleStampType}
                // aria-label="login switch"
              />
            }
            label={stampType ? "stamp" : "chart"}
          />
        </FormGroup>
        <button
          name="goUserConsole"
          onClick={() => history.push("/userConsole")}
        >
          Go UserConsole!
        </button>
      </div>
      <div>성공률 : {yesDays} % </div>
      {records.map((el, idx) => {
        return el >= goal ? (
          <div key={idx}>{el}</div>
        ) : (
          <div key={idx}>{el}</div>
        );
      })}
    </div>
  );
};

export default UserRecords;
