import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: `0 ${theme.spacing(10)}px`
  }
}))

const Navbar = () => {
  const classes = useStyles()

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
          <Avatar>A</Avatar>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
