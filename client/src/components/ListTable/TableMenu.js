import React, { useState } from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import SendIcon from "@material-ui/icons/Send"
import PrintIcon from "@material-ui/icons/Print"
import SaveIcon from "@material-ui/icons/SaveAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Confirm from "./Confirm"

const TableMenu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [dialog, setDialog] = useState(false)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = _ => setAnchorEl(null)
  const handleDeleteClick = _ => setDialog(true)

  return (
    <>
      <Tooltip title="Options">
        <IconButton aria-label="Options" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="options"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Print" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SaveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Download" />
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Confirm id={id} open={dialog} setOpen={setDialog} />
      </Menu>
    </>
  )
}

export default TableMenu
