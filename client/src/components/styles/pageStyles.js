import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: theme.shape.borderRadius.toFixed(2),
    padding: theme.spacing(1)
  }
}))
