import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Register from "../components/Auth/Register";
import Feedback from "../components/Feedback/AuthAlert";
import { UserContext } from "../context/UserContext";
import { useStyles } from "./styles/registerPage";
import { Redirect } from "react-router-dom";

const RegisterPage = () => {
  document.title = "List Makerr - Register";

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
