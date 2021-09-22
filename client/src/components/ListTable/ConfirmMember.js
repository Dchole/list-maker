import PropTypes from "prop-types"
import React, { useContext } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"
import { ListContext } from "../../context/ListContext"

/**
 *
 * @param {import("prop-types").InferProps<ConfirmMember.propTypes>} props
 * @returns
 */
const ConfirmMember = ({ open, setOpen, selected, list, setSelected }) => {
  const {
    loading: { actionLoading },
    removeMember
  } = useContext(ListContext)

  const handleClose = () => setOpen(false)

  const handleDelete = () => {
    selected.forEach(selectedId => {
      const selectedMember = list.members.find(
        member => member._id === selectedId
      )
      list.members.splice(list.members.indexOf(selectedMember), 1)
    })
    removeMember(list)
    setSelected([])
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            <span style={{ color: "#d50000" }}>delete</span> this member?
            <br />
            Members <span style={{ color: "#d50000" }}>deleted</span> cannot be
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
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={25} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ConfirmMember.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  list: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
  }).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setSelected: PropTypes.func.isRequired
}

export default ConfirmMember
