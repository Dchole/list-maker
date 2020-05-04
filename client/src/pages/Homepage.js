import React, { useContext } from "react"
import Navbar from "../components/Navbar"
import Main from "../components/Main"
import CircularProgress from "@material-ui/core/CircularProgress"
import { UserContext } from "../context/UserContext"
import { Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "@media (min-width: 1024px)": {
    root: {
      height: "100vh"
    }
  }
}))

const Homepage = () => {
  const classes = useStyles()

  const {
    state: { isAuthenticated },
    userLoading
  } = useContext(UserContext)

  if (userLoading) return <CircularProgress />

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
