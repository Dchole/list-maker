import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Hidden from "@material-ui/core/Hidden"
import Panel from "../components/Auth/Panel"
import Register from "../components/Auth/Register"
import { UserContext } from "../context/UserContext"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  }
}))

const RegisterPage = () => {
  const classes = useStyles()
  const {
    state: { isAuthenticated }
  } = useContext(UserContext)

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container component="main">
        <Grid item xs={12} sm={6}>
          <Paper>
            <Register />
          </Paper>
        </Grid>
        <Grid style={{ zIndex: 1000 }} item xs={6}>
          <Paper style={{ height: "100%" }}>
            <Hidden smDown>
              <Panel />
            </Hidden>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RegisterPage
