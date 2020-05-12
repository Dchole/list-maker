import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { useLocation } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `linear-gradient(to top right, #09f, cyan)`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "130px 90px 130px 90px",
    color: "white"
  },
  head: {
    marginBottom: theme.spacing(2)
  },
  googleAuth: {
    backgroundColor: "white",
    borderRadius: "50%",
    height: 120,
    width: 120
  }
}))

const Panel = () => {
  const location = useLocation()
  const classes = useStyles()

  const route = location.pathname === "/register" ? "Sign up" : "Sign in"

  return (
    <div className={classes.root}>
      <div className={classes.googleAuth}></div>
      <br />
      <Divider />
      <Typography variant="caption">{route} with google</Typography>
    </div>
  )
}

export default Panel
