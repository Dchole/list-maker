import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import { Link as RouterLink } from "react-router-dom"
import { ListContext } from "../context/ListContext"

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.sm * 0.6,
    padding: theme.spacing(1)
  },
  action: { display: "flex", justifyContent: "flex-end" },
  active: { textTransform: "capitalize" }
}))

const ActiveCard = () => {
  const classes = useStyles()

  const {
    state: { lists }
  } = useContext(ListContext)

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography variant="h6">
            Active Lists{" "}
            <span role="img" aria-label="read">
              ⏱
            </span>
          </Typography>
        }
      />
      <CardContent>
        {lists.length !== 0 ? (
          <ul className={classes.active}>
            {lists.map(list => (
              <li key={list._id}>
                <Link component={RouterLink} to={`/lists/${list._id}`}>
                  {list.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <Typography component="h4" variant="body2">
            There are no active lists.{" "}
            <span role="img" aria-label="Oops">
              ¯\_(ツ)_/¯
            </span>
            <br />
            Click "Create List" on the previous card{" "}
            <span role="img" aria-label="backwards arrow">
              👈
            </span>{" "}
            to add an active list.
          </Typography>
        )}
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

export default ActiveCard
