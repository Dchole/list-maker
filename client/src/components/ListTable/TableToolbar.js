import React, { useState } from "react"
import { makeStyles, lighten } from "@material-ui/core/styles"
import clsx from "clsx"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Feedback from "../Feedback"
import TableMenu from "./TableMenu"

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.grey[100]
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize"
  },
  status: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: "50%"
  },
  active: {
    backgroundColor: theme.palette.success.main
  },
  notActive: {
    backgroundColor: theme.palette.error.main
  },

  "@media (max-width: 480px)": {
    title: {
      width: 90,
      fontSize: "1.2rem"
    }
  }
}))

const TableToolbar = ({ numSelected, title, active, id, handleDelete }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/add/${id}`)
    setOpen(true)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
          noWrap
        >
          {title}
        </Typography>
      )}
      <div style={{ flexGrow: 1 }}>
        <Button variant="outlined" size="small" color="primary" onClick={copy}>
          Get Link
        </Button>
        <Feedback open={open} setOpen={setOpen} message={"Copied!"} />
      </div>
      <div
        className={clsx(
          classes.status,
          active ? classes.active : classes.notActive
        )}
      />
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <TableMenu id={id} />
      )}
    </Toolbar>
  )
}

export default TableToolbar
