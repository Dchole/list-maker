import React, { useState, useContext } from "react"
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
import xlsx from "xlsx"
import { saveAs } from "file-saver"
import Confirm from "./Confirm"
import { jsonData } from "../util/jsonData"
import { ListContext } from "../../context/ListContext"

const TableMenu = ({ id }) => {
  const {
    state: { lists }
  } = useContext(ListContext)

  const list = lists.find(list => list._id === id)

  const [anchorEl, setAnchorEl] = useState(null)
  const [dialog, setDialog] = useState(false)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = _ => setAnchorEl(null)
  const handleDeleteClick = _ => setDialog(true)

  const handleDownload = () => {
    const sheet = xlsx.utils.json_to_sheet(jsonData(list))
    const workbook = xlsx.utils.book_new()

    xlsx.utils.book_append_sheet(workbook, sheet, list.title)

    const excelFile = xlsx.writeFile(workbook, `${list.title}.xlsx`)
    const blob = new Blob([excelFile])
    saveAs(blob, `${list.title}.xlsx`)

    setAnchorEl(false)
  }

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
        <MenuItem onClick={handleDownload}>
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
