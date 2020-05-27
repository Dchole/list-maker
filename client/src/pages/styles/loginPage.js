import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center"
  },
  feedback: {
    position: "absolute",
    width: "100%"
  }
}));
