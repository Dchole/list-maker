import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { UserContext } from "../context/UserContext"
import { Link as RouterLink, useLocation } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: theme.spacing(0, 10)
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none"
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    textDecoration: "none"
  },
  "@media (max-width: 720px)": {
    toolbar: {
      padding: theme.spacing(0, 1)
    }
  }
}))

const Navbar = () => {
  const location = useLocation()
  const classes = useStyles()
  const {
    state: { user },
    exitApp
  } = useContext(UserContext)

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          className={classes.title}
        >
          Make A List{" "}
          <span role="img" aria-label="List emoji">
            📃
          </span>
        </Typography>
        <div>
          {location.pathname === "/dashboard" ? (
            <IconButton style={{ color: "white" }} onClick={exitApp}>
              <ExitToAppIcon color="inherit" />
            </IconButton>
          ) : (
            <Avatar
              component={RouterLink}
              className={classes.avatar}
              to="/dashboard"
            >
              {user.fullName?.charAt()}
            </Avatar>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
