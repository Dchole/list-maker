import PropTypes from "prop-types"
import React, { useState, useContext } from "react"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import SaveIcon from "@material-ui/icons/SaveAlt"
import DeleteIcon from "@material-ui/icons/Delete"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import xlsx from "xlsx"
import { saveAs } from "file-saver"
import { Packer } from "docx"
import { jsonData } from "../util/jsonData"
import { ListContext } from "../../context/ListContext"
import Confirm from "./Confirm"
import docx from "../util/jsonToDocxData"
import DownloadAs from "./DownloadAs"

const TableMenu = ({ id }) => {
  const {
    state: { lists }
  } = useContext(ListContext)

  const list = lists.find(list => list._id === id)

  const [anchorEl, setAnchorEl] = useState(null)
  const [dialog, setDialog] = useState(false)
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleDeleteClick = () => setDialog(true)

  const handleDownloadClick = () => setDownloadDialogOpen(true)

  const handleDownloadAsExcel = () => {
    const sheet = xlsx.utils.json_to_sheet(jsonData(list))
    const workbook = xlsx.utils.book_new()

    xlsx.utils.book_append_sheet(workbook, sheet, list.title)

    xlsx.writeFile(workbook, `${list.title}.xlsx`)

    setAnchorEl(false)
    setDownloadDialogOpen(false)
  }

  const handleDownloadAsDocx = () => {
    const doc = docx(list)
    Packer.toBuffer(doc).then(buffer => {
      const blob = new Blob([buffer])
      saveAs(blob, `${list.title}.docx`)
    })

    setDownloadDialogOpen(false)
  }

  return (
    <>
      <Tooltip title="Options">
        <IconButton aria-label="Options" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        aria-hidden={!anchorEl}
      >
        <MenuItem onClick={handleDownloadClick}>
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
        <DownloadAs
          open={downloadDialogOpen}
          setOpen={setDownloadDialogOpen}
          handleDownloadAsExcel={handleDownloadAsExcel}
          handleDownloadAsDocx={handleDownloadAsDocx}
        />
      </Menu>
    </>
  )
}

TableMenu.propTypes = {
  id: PropTypes.string.isRequired
}

export default TableMenu
