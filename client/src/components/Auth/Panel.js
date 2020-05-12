import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useLocation } from "react-router-dom"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `linear-gradient(to top right, #09f, cyan)`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(5),
    color: "white"
  },
  googleAuth: {
    backgroundColor: "white",
    borderRadius: "50%",
    height: 120,
    width: 120
  },
  divider: {
    width: "100%",
    backgroundColor: "white"
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
      <Divider className={classes.divider} />
      <Typography variant="caption">{route} with google</Typography>
    </div>
  )
}

export default Panel
