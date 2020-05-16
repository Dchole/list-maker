import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Login from "../components/Auth/Login"
import Feedback from "../components/AuthAlert"
import { UserContext } from "../context/UserContext"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  },
  feedback: {
    position: "absolute",
    width: "100%"
  }
}))

const LoginPage = () => {
  const classes = useStyles()

  const {
    state: { isAuthenticated }
  } = useContext(UserContext)

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <>
      <Feedback />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper>
          <Login />
        </Paper>
      </Container>
    </>
  )
}

export default LoginPage
