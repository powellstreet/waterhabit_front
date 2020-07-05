import React, { useEffect, useState } from "react";
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

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));
const MainBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            100일간의 물마시기 습관, WaterHabit
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
    </div>
  );
};

export default MainBar;
