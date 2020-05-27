import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
    position: "fixed",
    bottom: 0,
    width: "100%"
  }
}));
