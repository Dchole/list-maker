import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Typography from "@material-ui/core/Typography"
import AdminForm from "./AdminForm"

const useStyles = makeStyles(theme => ({
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
}))

const CreateCard = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [display, setDisplay] = useState(true)

  return (
    <Card className={classes.root} id="create-card">
      <CardHeader
        title={
          <Typography variant="h6">
            Create List{" "}
            <span role="img" aria-label="Add">
              📝
            </span>
          </Typography>
        }
      />
      <CardContent>
        {!expanded ? (
          <Typography variant="body2" align="center">
            Make a list with your employees, students and groups with so many
            options yet easy to maintain. Click on the button{" "}
            <span role="img" aria-label="Arrow down">
              👇
            </span>{" "}
            to start
          </Typography>
        ) : (
          <Typography variant="body1" align="center">
            For easy maintenance, we autofill your field with "Full Name". You
            can change it or remove it but we recommend you leave it be so you
            can easily identify members who adds to your list
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <div
          style={{ margin: "auto" }}
          className={expanded ? classes.actionHide : classes.actionShow}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ display: display ? "block" : "none" }}
            onClick={() => {
              setExpanded(true)
              setTimeout(() => setDisplay(false), 195)
            }}
          >
            Create List
          </Button>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <AdminForm setExpanded={setExpanded} setDisplay={setDisplay} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default CreateCard
