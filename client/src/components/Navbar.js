import React, { useContext } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"
import { UserContext } from "../context/UserContext"

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: `0 ${theme.spacing(10)}px`
  }
}))

const Navbar = () => {
  const classes = useStyles()
  const {
    state: { user }
  } = useContext(UserContext)

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Make A List{" "}
          <span role="img" aria-label="List emoji">
            📃
          </span>
        </Typography>
        <div>
          <Avatar>{user.fullName?.charAt()}</Avatar>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
