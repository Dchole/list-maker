import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Login from "../components/Auth/Login";
import Feedback from "../components/Feedback/AuthAlert";
import { UserContext } from "../context/UserContext";
import { useStyles } from "./styles/loginPage";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  document.title = "List Makerr - Login";

  const classes = useStyles();

  const {
    state: { isAuthenticated }
  } = useContext(UserContext);

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <>
      <Feedback />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper>
          <Login />
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
