import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Typography from "@material-ui/core/Typography"
import AdminForm from "../Forms/AdminForm"
// import { useStyles } from "./styles/createCard"

const CreateCard = () => {
  // const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [display, setDisplay] = useState(true)

  return (
    <Card /* className={classes.root} */ id="create-card">
      <CardHeader
        title={
          <Typography variant="h6" component="h2">
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
            <span role="img" aria-label="below">
              👇
            </span>{" "}
            to start
          </Typography>
        ) : (
          <Typography variant="body1" align="center">
            List your requirements in field labelled{" "}
            <span style={{ color: "#d50000" }}>fields</span>.<br />
            Separate your list with comma(,). No need to ask for members&apos;
            names. Full name field is provided by default
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <div
          style={{ margin: "auto" }}
          // className={expanded ? classes.actionHide : classes.actionShow}
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
