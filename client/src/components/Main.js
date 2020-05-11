import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CreateCard from "./Cards/CreateCard"
import AboutCard from "./Cards/AboutCard"
import ActiveCard from "./Cards/ActiveCard"

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  "@media (max-width: 1200px)": {
    root: {
      flexDirection: "column",
      justifyContent: "space-evenly"
    }
  },
  "@media (min-width: 1200px)": {
    root: {
      height: "100vh"
    }
  }
})

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
