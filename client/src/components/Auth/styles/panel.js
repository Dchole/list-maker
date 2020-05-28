import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `linear-gradient(to top right, #09f, cyan)`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(5),
    color: "white"
  },
  googleAuth: {
    backgroundColor: "white",
    borderRadius: "50%",
    height: 120,
    width: 120
  },
  divider: {
    width: "100%",
    backgroundColor: "white"
  }
}));
