import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(9)
  },
  title: { textTransform: "capitalize", marginBottom: theme.spacing(4) },
  link: {
    backgroundColor: "white",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1),
    cursor: "pointer"
  },
  linkContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    marginTop: theme.spacing(5),
    height: 750
  },

  "@media (max-width: 720px)": {
    linkContainer: { width: "100%" }
  }
}));
