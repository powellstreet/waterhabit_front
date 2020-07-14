import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { LocalDrink, AccountCircle, Face } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(20),
      right: theme.spacing(10),
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

const SpeedDialButton = () => {
  const classes = useStyles();
  const history = useHistory();

  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function goPush() {
    history.push("./userConsole");
  }

  const actions = [
    {
      icon: <LocalDrink />,
      name: "오늘의물",
      moveTo: () => history.push("./userConsole"),
    },
    {
      icon: <Face />,
      name: "나의기록",
      moveTo: () => history.push("./userRecords"),
    },
    {
      icon: <AccountCircle />,
      name: "나의프로필",
      moveTo: () => history.push("./profile"),
    },
  ];

  return (
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
            tooltipOpen
            tooltipTitle={action.name}
            onClick={action.moveTo}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDialButton;
