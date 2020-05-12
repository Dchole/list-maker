import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Hidden from "@material-ui/core/Hidden"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import { Link as RouterLink } from "react-router-dom"
import { ListContext } from "../../context/ListContext"

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.sm * 0.6,
    padding: theme.spacing(1),
    margin: theme.spacing(6, 0),
    maxHeight: theme.breakpoints.values.sm * 0.6
  },
  action: { display: "flex", justifyContent: "flex-end" },
  active: { textTransform: "capitalize" },
  link: { color: theme.palette.primary.main },
  "@media (max-height: 640px)": {
    root: {
      width: theme.breakpoints.values.sm * 0.5
    }
  }
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
          <Typography variant="h6" component="h2">
            Active Lists{" "}
            <span role="img" aria-label="read">
              ⏱
            </span>
          </Typography>
        }
      />
      <CardContent>
        {lists.length > 0 ? (
          <List className={classes.active}>
            <Divider />
            {lists
              .filter(list => list.active)
              .slice(0, 3)
              .map(list => (
                <li key={list._id}>
                  <ListItem
                    component={RouterLink}
                    to={`/lists/${list._id}`}
                    button
                    divider
                  >
                    <ListItemText
                      primary={list.title}
                      className={classes.link}
                    />
                  </ListItem>
                </li>
              ))}
          </List>
        ) : (
          <Typography component="h4" variant="body2">
            There are no active lists.{" "}
            <span role="img" aria-label="Oops">
              ¯\_(ツ)_/¯
            </span>
            <br />
            Click <span style={{ color: "#d50000" }}>Create List</span> on the
            previous card{" "}
            <Hidden mdDown>
              <span role="img" aria-label="">
                👈
              </span>{" "}
            </Hidden>
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
