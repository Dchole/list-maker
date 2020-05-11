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
          <ListItemIcon>
            <ExcelIcon />
          </ListItemIcon>
          <ListItemText primary="Excel" />
        </ListItem>
        <ListItem
          button
          onClick={handleDownloadAsDocx}
          aria-label="Download as document"
        >
          <ListItemIcon>
            <DocumentIcon />
          </ListItemIcon>
          <ListItemText primary="Document" />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default DownloadAs
