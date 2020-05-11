import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CreateCard from "./Cards/CreateCard"
import AboutCard from "./Cards/AboutCard"
import ActiveCard from "./Cards/ActiveCard"

const useStyles = makeStyles(theme => ({
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
  head: {
    paddingTop: theme.spacing(5)
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
    <>
      <Typography variant="h4" component="h1" className={classes.head}>
        Create and Manage a list with ease
      </Typography>
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
    </>
  )
}

export default Main
