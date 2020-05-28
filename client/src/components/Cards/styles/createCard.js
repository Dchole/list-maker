import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.sm * 0.6,
    maxHeight: theme.spacing(10) * 8,
    paddingBottom: theme.spacing(1),
    margin: theme.spacing(6, 0)
  },
  actionHide: {
    transform: "scale(0)",
    transitionDuration: theme.transitions.duration.leavingScreen,
    transitionTimingFunction: theme.transitions.easing.easeIn
  },
  actionShow: {
    transform: "scale(1)",
    transitionDuration: theme.transitions.duration.enteringScreen,
    transitionTimingFunction: theme.transitions.easing.easeIn
  },
  "@media (max-height: 640px)": {
    root: {
      width: "100%",
      padding: theme.spacing(2)
    }
  }
}));
