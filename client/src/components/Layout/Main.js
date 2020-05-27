import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CreateCard from "../Cards/CreateCard";
import AboutCard from "../Cards/AboutCard";
import ActiveCard from "../Cards/ActiveCard";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%"
  },
  "@media (max-width: 1200px)": {
    root: {
      paddingTop: theme.spacing(10)
    },
    container: {
      flexDirection: "column",
      justifyContent: "space-evenly"
    }
  },
  "@media (min-width: 1200px)": {
    root: {
      height: "90vh"
    }
  }
}));

const Main = () => {
  const theme = useTheme();
  const classes = useStyles();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" className={classes.root} component="main">
      <Typography variant={match ? "h6" : "h4"} component="h1">
        Create and Manage a list with ease
      </Typography>
      <div className={classes.container}>
        <AboutCard />
        <CreateCard />
        <ActiveCard />
      </div>
    </Container>
  );
};

export default Main;
