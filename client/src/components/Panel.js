import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { blue, cyan } from "@material-ui/core/colors"
import { Typography, Button } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `linear-gradient(-45deg,${blue["A700"]},${cyan.A200})`,
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
