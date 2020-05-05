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
    alignItems: "center"
  },
  "@media (max-width: 1200px)": {
    root: {
      flexDirection: "column",
      justifyContent: "space-around",
      marginTop: theme.spacing(6)
    }
  },
  "@media (min-width: 1200px)": {
    root: {
      height: "100vh"
    }
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
