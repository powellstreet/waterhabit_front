import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Mail,
  MoveToInbox,
  AccountCircle,
  LocalDrink,
} from "@material-ui/icons";
import axios from "axios";
import dotenv from "dotenv";
import Stamp from './Stamp';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  useEffect(() => {
    axios.post(`http://localhost:${process.env.REACT_APP_PORT}/records/getStamp`, { userId })
      .then((res) => {
        // let rc = []; rc.length = 100; rc.fill(0);
        // res.data.forEach((el) => { rc[Number(el.day) - 1] = 1 })
        // setRecords(rc);
        // setYesDays(res.data.length);
        // console.log(rc)
        let rc = []; rc.length = 100; rc.fill(0);
        res.data.forEach((el) => { rc[Number(el.day) - 1] = el.intake })
        setRecords(rc);
        setYesDays(res.data.length);
        console.log(rc)
      });
  }, [])

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          {nickname}님 화이팅
          </Typography>
          {/* <Button color="inherit"> Sign Out </Button> */}
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => history.push("/userRecords")}
              color="inherit"
            >
              <LocalDrink />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/profile");
                }}
              >
                프로필
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <div>{nickname}님 화이팅입니다</div>
        <div>stamps : {stamp}</div>
        <button
          name="goUserConsole"
          onClick={() => history.push('/userConsole')}
        >
          Go UserConsole!
        </button>
      </div>
      <div>성공률 : {yesDays} % </div>
      {
        records.map((el, idx) => {
          return el >= goal ? <div key={idx}>{el}</div> : <div key={idx}>{el}</div>;
        })
      }

    </div>
  );
};

export default UserRecords;
