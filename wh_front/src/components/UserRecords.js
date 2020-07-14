import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Typography,
  CssBaseline,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import dotenv from "dotenv";
import Stamp from "./Stamp";
import MainBar from "./MainBar";
import LeftDrawer from "./LeftDrawer";
import FloatButton from "./FloatButton";
import SpeedDialButton from "./SpeedDialButton";

dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    // display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    backgroundColor: 'blue',
    height: '100%'
  },
  root: {
    // display: "flex",
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
  fab: {
    position: "fixed",
    bottom: "30%",
    right: "10%",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  mainGrid: {
    marginTop: theme.spacing(3),
    // backgroundColor: 'grey'
  },
  stampGrid : {
    marginTop: theme.spacing(3),
    paddingLeft: '15%',
    paddingRight: '15%'
  }
}));

const UserRecords = ({ history }) => {
  // const [records, setRecords] = useState([]);
  // const [yesDays, setYesDays] = useState(0);
  const records = [2000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 30, 5000, 3000, 3000, 30, 5000, 3000, 3000, 30, 5000, 3000, 3000, 30, 5000];
  const yesDays = 10;
  const goal = 2000

  const [stampType, setStampType] = useState("stamp");
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (bln) => (e) => {
    if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setDrawerOpen(bln);
  };

  const { userId, nickname, stamp, day } = useSelector((state) => ({
    userId: state.userId,
    nickname: state.nickname,
    stamp: state.stamp,
    // goal: state.goal,
    day: state.day,
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
  //       for (let i = 0; i < day; i++) {
  //         res.data[i] ? (rc[i] = res.data[i].intake) : (rc[i] = 0);
  //       }
  //       setRecords(rc);
  //       setYesDays(res.data.filter(el => el.intake >= goal).length);
  //       console.log(rc);
  //       console.log('this is resdata : ', res.data);
  //     });
  // }, []);

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
          <Grid item xs={12} style={{ backgroundColor: "orange" }}>
            <div>
              <div>{nickname}님 화이팅입니다</div>
              <div>날짜 : {day}, 성공일수 : {yesDays}</div>
              <FormGroup>
                <FormControlLabel
                  control={<Switch onChange={handleStampType} />}
                  label={stampType ? "stamp" : "chart"}
                />
              </FormGroup>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          justify="center"
          className={classes.stampGrid}
        >
          {records.map((el, idx) => {
            return el >= goal ? (
              <Grid
                item
                xs={1}
                spacing={5}
                style={{ backgroundColor: "skyblue" }}
              >
                <Stamp key={idx} day={idx + 1} intake={el} />
              </Grid>
            ) : (
              <Grid
                item
                xs={1}
                spacing={5}
                style={{ backgroundColor: "orange" }}
              >
                <Stamp key={idx} intake={el} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* <FloatButton toggleDrawer={toggleDrawer} /> */}
      {/* <SpeedDialButton /> */}
    </div>
  );
};

export default UserRecords;
