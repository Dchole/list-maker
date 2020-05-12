import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Redirect } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import Backdrop from "@material-ui/core/Backdrop"
import Navbar from "../components/Navbar"
import Main from "../components/Main"
import { UserContext } from "../context/UserContext"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "space-between",
    minHeight: "100vh"
  },
  footer: {
    textAlign: "center",
    position: "absolute",
    bottom: 0,
    width: "100%"
  }
}))

const Homepage = () => {
  const classes = useStyles()

  const {
    state: { isAuthenticated },
    userLoading
  } = useContext(UserContext)

  if (userLoading)
    return (
      <Backdrop open={userLoading} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  if (!isAuthenticated) return <Redirect to="/register" />

  return (
    <div className={classes.root}>
      <Navbar />
      <Main />
      <footer className={classes.footer}>
        &copy; Created by Derek Oware, 2020
      </footer>
    </div>
  )
}

export default Homepage
