import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Hidden from "@material-ui/core/Hidden"

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.sm * 0.6,
    padding: theme.spacing(1),
    margin: theme.spacing(6, 0)
  },
  "@media (max-height: 640px)": {
    root: {
      width: "100%"
    }
  }
}))

const AboutCard = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography component="h2" variant="h6">
            How To Make List{" "}
            <span role="img" aria-label="read">
              📖
            </span>
          </Typography>
        }
      />
      <CardContent>
        <Typography component="div" variant="body2">
          <p>To start a list; </p>
          <ul>
            <li>
              Click on <span style={{ color: "#d50000" }}>Create List</span> on
              the next card{" "}
              <Hidden mdDown>
                <span role="img" aria-label="forward arrow">
                  👉
                </span>{" "}
              </Hidden>
            </li>
            <li>Add the fields you want your list to have</li>
            <li>Click Done</li>
            <li>Copy the generated link and share with your members</li>
          </ul>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AboutCard
