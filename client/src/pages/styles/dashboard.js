import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  head: {
    marginTop: theme.spacing(10)
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(5)
  },
  list: {
    marginBottom: theme.spacing(5)
  },
  "@media (max-width: 720px)": {
    main: { width: "100%" }
  }
}));
