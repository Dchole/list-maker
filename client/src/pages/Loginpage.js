import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Container, Paper, Hidden } from "@material-ui/core"
import Panel from "../components/Auth/Panel"
import Login from "../components/Auth/Login"
import { UserContext } from "../context/UserContext"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  }
}))

const LoginPage = () => {
  const classes = useStyles()
  const {
    state: { isAuthenticated }
  } = useContext(UserContext)

  if (isAuthenticated) return <Redirect to="/" />

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper component="main">
        <Grid container>
          <Grid style={{ zIndex: 1000 }} item xs={6}>
            <Hidden smDown>
              <Panel />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Login />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default LoginPage
