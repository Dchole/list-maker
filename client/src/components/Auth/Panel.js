import React from "react";
import { useLocation } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles/panel";

const Panel = () => {
  const location = useLocation();
  const classes = useStyles();

  const route = location.pathname === "/register" ? "Sign up" : "Sign in";

  return (
    <div className={classes.root}>
      <div className={classes.googleAuth}></div>
      <br />
      <Divider className={classes.divider} light />
      <Typography variant="caption">{route} with google</Typography>
    </div>
  );
};

export default Panel;
