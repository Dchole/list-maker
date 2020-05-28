import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10)
  },
  alert: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  paper: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4, 4, 6, 4)
  },
  form: {
    display: "none"
  }
}));
