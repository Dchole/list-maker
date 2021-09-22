import PropTypes from "prop-types"
import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import ExcelIcon from "@material-ui/icons/GridOn"
import DocumentIcon from "@material-ui/icons/Description"

const DownloadAs = ({
  open,
  setOpen,
  handleDownloadAsExcel,
  handleDownloadAsDocx
}) => {
  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="Download-As-title"
      open={open}
    >
      <DialogTitle id="Download-As-title">Save As</DialogTitle>
      <List>
        <ListItem
          button
          onClick={handleDownloadAsExcel}
          aria-label="Download as excel"
        >
          <ListItemIcon style={{ color: "#4CAF50" }}>
            <ExcelIcon />
          </ListItemIcon>
          <ListItemText primary="Excel" style={{ color: "#4CAF50" }} />
        </ListItem>
        <ListItem
          button
          onClick={handleDownloadAsDocx}
          aria-label="Download as document"
        >
          <ListItemIcon style={{ color: "#3F51B5" }}>
            <DocumentIcon />
          </ListItemIcon>
          <ListItemText primary="Document" style={{ color: "#3F51B5" }} />
        </ListItem>
      </List>
    </Dialog>
  )
}

DownloadAs.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleDownloadAsExcel: PropTypes.func.isRequired,
  handleDownloadAsDocx: PropTypes.func.isRequired
}

export default DownloadAs
