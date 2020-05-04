import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

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
  },
  action: { display: "flex", justifyContent: "flex-end" }
}))

const AboutCard = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography variant="h6">
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
              Click on "Create List" on the next card{" "}
              <span role="img" aria-label="forward arrow">
                👉
              </span>{" "}
            </li>
            <li>Add the fields you want your list to have</li>
            <li>Click Done</li>
            <li>Copy the generated link and share with your members</li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <div>
          <Button variant="outlined" size="small" color="primary">
            Learn More
          </Button>
        </div>
      </CardActions>
    </Card>
  )
}

export default AboutCard
