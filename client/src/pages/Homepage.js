import React, { useContext } from "react"
import Navbar from "../components/Navbar"
import Main from "../components/Main"
import { makeStyles } from "@material-ui/core"
import { UserContext } from "../context/UserContext"
import { Redirect } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }
}))

const Homepage = () => {
  const classes = useStyles()
  const {
    state: { isAuthenticated }
  } = useContext(UserContext)

  if (!isAuthenticated) return <Redirect to="/register" />

  return (
    <div className={classes.root}>
      <Navbar />
      <Main />
      <footer>&copy; Created by Derek Oware, 2020</footer>
    </div>
  )
}

export default Homepage
