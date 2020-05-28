import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  toolbar: {
    padding: theme.spacing(0, 10)
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none"
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    textDecoration: "none"
  },
  "@media (max-width: 720px)": {
    toolbar: {
      padding: theme.spacing(0, 1)
    }
  }
}));
