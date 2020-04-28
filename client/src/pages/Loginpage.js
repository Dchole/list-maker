import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Container, Paper, Hidden } from "@material-ui/core"
import Panel from "../components/Panel"
import Login from "../components/Login"

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  }
}))

const pageVariants = {
  in: { transform: "rotateY(0deg)" },
  out: { transform: "rotateY(90deg)" }
}

const LoginPage = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper>
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
