import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CreateCard from "./CreateCard"
import AboutCard from "./AboutCard"
import ActiveCard from "./ActiveCard"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: theme.breakpoints.values.md
  }
}))

const Main = () => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <div>
        <AboutCard />
      </div>
      <div>
        <CreateCard />
      </div>
      <div>
        <ActiveCard />
      </div>
    </Container>
  )
}

export default Main
