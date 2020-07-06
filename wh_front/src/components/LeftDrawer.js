import React from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle, LocalDrink, Face } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const LeftDrawer = ({ toggleDrawer, drawerOpen, history }) => {
  const classes = useStyles();

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history.push("/profile")}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="프로필" />
        </ListItem>
        <Divider />

        <ListItem button onClick={() => history.push("/userConsole")}>
          <ListItemIcon>
            <Face />
          </ListItemIcon>
          <ListItemText primary="메인 메뉴" />
        </ListItem>
      </List>

      <ListItem button onClick={() => history.push("/userRecords")}>
        <ListItemIcon>
          <LocalDrink />
        </ListItemIcon>
        <ListItemText primary="나의 기록" />
      </ListItem>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default LeftDrawer;
