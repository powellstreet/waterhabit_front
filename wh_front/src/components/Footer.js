import React from "react";
import { CssBaseline, Typography, Container, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {/* {"Copyright © "} */}
      <Link 
        color="inherit" 
        // href="https://material-ui.com/"
      >
        by powellstreet
      </Link>{" "}
      {/* {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // minHeight: "30vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    // backgroundColor:
    //   theme.palette.type === "light"
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[800],
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            WaterHabit
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
