import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import Grow from "@material-ui/core/Grow"
import Alert from "@material-ui/lab/Alert"

const Feedback = ({ open, setOpen }) => (
  <>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Grow}
      autoHideDuration={1000}
    >
      <Alert severity="success">Copied!</Alert>
    </Snackbar>
  </>
)

export default Feedback
