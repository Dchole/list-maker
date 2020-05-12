import React, { useContext, useState } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { ListContext } from "../../context/ListContext"
import Feedback from "../Feedback"

const Confirm = ({ id, open, setOpen }) => {
  const {
    state: { feedback },
    removeList
  } = useContext(ListContext)

  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const handleClose = _ => setOpen(false)
  const handleDelete = _ => {
    removeList(id)
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        aria-hidden={!open}
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            <span style={{ color: "#d50000" }}>delete</span> this list?
            <br />
            Lists <span style={{ color: "#d50000" }}>deleted</span> cannot be
            restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
        <Feedback
          open={feedbackOpen}
          setOpen={setFeedbackOpen}
          message={feedback}
        />
      </Dialog>
    </div>
  )
}

export default Confirm
