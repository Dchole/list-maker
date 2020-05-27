import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Register from "../components/Auth/Register";
import Feedback from "../components/Feedback/AuthAlert";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  }
}));

const RegisterPage = () => {
  const classes = useStyles();
  const {
    state: { isAuthenticated }
  } = useContext(UserContext);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <>
      <Feedback />
      <Container component="main" maxWidth="sm" className={classes.root}>
        <Paper>
          <Register />
        </Paper>
      </Container>
    </>
  );
};

export default RegisterPage;
