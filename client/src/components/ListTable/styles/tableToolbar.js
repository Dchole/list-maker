import { makeStyles, lighten } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.grey[100]
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize"
  },
  status: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: "50%"
  },
  active: {
    backgroundColor: theme.palette.success.main
  },
  notActive: {
    backgroundColor: theme.palette.error.main
  },

  [theme.breakpoints.down("xs")]: {
    title: {
      width: 90,
      fontSize: "1.2rem"
    }
  }
}));
