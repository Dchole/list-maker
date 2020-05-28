import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
