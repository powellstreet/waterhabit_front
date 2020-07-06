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
import axios from "axios";
import dotenv from "dotenv";
import Stamp from "./Stamp";
import MainBar from "./MainBar";
import LeftDrawer from "./LeftDrawer";

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
  // const [records, setRecords] = useState([]);
  // const [yesDays, setYesDays] = useState(0);
  const records = [2000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 30, 5000];
  const yesDays = 10;

  const [stampType, setStampType] = useState("stamp");
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (bln) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setDrawerOpen(bln);
  };

  const { userId, nickname, stamp, goal } = useSelector((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    stamp: state.stamp,
    goal: state.goal,
  }));

  const handleStampType = (e) => {
    setStampType(e.target.checked);
  };

  // 작업하는 동안만 주석화!
  // useEffect(() => {
  //   axios
  //     .post(`http://localhost:${process.env.REACT_APP_PORT}/records/getStamp`, {
  //       userId,
  //     })
  //     .then((res) => {
  //       let rc = [];
  //       rc.length = 100;
  //       rc.fill(0);
  //       res.data.forEach((el) => {
  //         rc[Number(el.day) - 1] = el.intake;
  //       });
  //       setRecords(rc);
  //       setYesDays(res.data.length);
  //       console.log(rc);
  //     });
  // }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainBar history={history} />
      <LeftDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} history={history} />

      <div className={classes.paper}>
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
          <Button
            name="goUserConsole"
            color="primary"
            variant="outlined"
            onClick={() => history.push("/userConsole")}
          >
            Go UserConsole!
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
        <div>성공률 : {yesDays} % </div>
        {records.map((el, idx) => {
          return el >= goal ? (
            <Stamp key={idx} day={idx + 1} intake={el} />
          ) : (
            <Stamp key={idx} intake={el} />
          );
        })}
      </div>
    </div>
  );
};

export default UserRecords;
