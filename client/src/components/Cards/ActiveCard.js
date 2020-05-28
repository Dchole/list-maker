import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { ListContext } from "../../context/ListContext";
import { useStyles } from "./styles/activeCard";

const ActiveCard = () => {
  const classes = useStyles();

  const {
    state: { lists }
  } = useContext(ListContext);

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
            {lists
              .filter(list => list.active)
              .slice(0, 4)
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
    </Card>
  );
};

export default ActiveCard;
