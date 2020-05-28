import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.sm * 0.6,
    padding: theme.spacing(1),
    margin: theme.spacing(6, 0),
    maxHeight: theme.breakpoints.values.sm * 0.6
  },
  active: { textTransform: "capitalize" },
  link: { color: theme.palette.primary.main },
  [theme.breakpoints.down("xs")]: {
    root: {
      width: theme.breakpoints.values.sm * 0.5
    }
  }
}));
