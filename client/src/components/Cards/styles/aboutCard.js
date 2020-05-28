import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.sm * 0.6,
    padding: theme.spacing(1),
    margin: theme.spacing(6, 0)
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      width: "100%"
    }
  }
}));
