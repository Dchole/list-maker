import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Navbar from "../components/Layout/Navbar";
import Main from "../components/Layout/Main";
import { Redirect } from "react-router-dom";
import { useStyles } from "./styles/homepage";
import { UserContext } from "../context/UserContext";

const Homepage = () => {
  document.title = "List Makerr - Home";

  const classes = useStyles();

  const {
    state: { isAuthenticated },
    loading: { userLoading }
  } = useContext(UserContext);

  if (userLoading)
    return (
      <Backdrop open={userLoading} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  if (!isAuthenticated) return <Redirect to="/register" />;

  return (
    <div className={classes.root}>
      <Navbar />
      <Main />
      <footer className={classes.footer}>
        &copy; Created by Derek Oware, 2020
      </footer>
    </div>
  );
};

export default Homepage;
