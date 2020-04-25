import React from "react"
import ListsTable from "../components/ListsTable"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    paddingTop: theme.spacing(10),
    backgroundColor: "#ccc"
  }
}))

const Homepage = () => {
  const classes = useStyles()

  return (
    <main className={classes.root}>
      <ListsTable />
    </main>
  )
}

export default Homepage
