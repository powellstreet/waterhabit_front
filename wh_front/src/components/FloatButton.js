import React from "react";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Mail } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: "30%",
    right: "10%",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const FloatButton = ({ toggleDrawer }) => {
  const classes = useStyles();
  
  return (
    <div>
      <Fab
        variant="extended"
        color="secondary"
        className={classes.fab}
        onClick={toggleDrawer(true)}
      >
        <Mail className={classes.extendedIcon} />
        whole menu
      </Fab>
    </div>
  );
};

export default FloatButton;
