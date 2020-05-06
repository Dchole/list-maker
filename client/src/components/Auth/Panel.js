import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.tonalOffset.light,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "130px 90px 130px 90px",
    color: "white"
  }
}))

const Panel = () => {
  const classes = useStyles()

  return <div className={classes.root}></div>
}

export default Panel
