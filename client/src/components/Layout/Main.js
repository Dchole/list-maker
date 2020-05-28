import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CreateCard from "../Cards/CreateCard";
import AboutCard from "../Cards/AboutCard";
import ActiveCard from "../Cards/ActiveCard";
import { useStyles } from "./styles/main";

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
