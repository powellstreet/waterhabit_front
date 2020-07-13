import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/Home";
import SignUp from "./components/SignUp";
import UserConsole from "./components/UserConsole";
import UserRecords from "./components/UserRecords";
import WholeRecords from "./components/WholeRecords";
import Profile from "./components/Profile";
import MainBar from "./components/MainBar";
import Footer from "./components/Footer";

import { makeStyles } from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { FileCopyOutlined, Save, Print, Share, Favorite } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(20),
      right: theme.spacing(15),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(20),
      left: theme.spacing(15),
    },
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 380,
    },
  },
}));

const actions = [
  { icon: <FileCopyOutlined />, name: "Copy" },
  { icon: <Save />, name: "Save" },
  { icon: <Print />, name: "Print" },
  { icon: <Share />, name: "Share" },
  { icon: <Favorite />, name: "Like" },
];

function App() {
  const classes = useStyles();

  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/userConsole" component={UserConsole} />
          <Route path="/profile" component={Profile} />
          <Route path="/userRecords" component={UserRecords} />
          <Route path="/wholeRecords" component={WholeRecords} />
          <Route path="/mainBar" component={MainBar} />
        </Switch>
        <Footer />
        <div className={classes.exampleWrapper}>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
