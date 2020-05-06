import React, { useState } from "react"
import { makeStyles, lighten } from "@material-ui/core/styles"
import clsx from "clsx"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import Feedback from "../Feedback"

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flexGrow: 1,
    textTransform: "capitalize"
  },
  status: {
    width: theme.spacing(2),
    height: theme.spacing(2),
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

const TableToolbar = props => {
  const [open, setOpen] = useState(false)
  const classes = useToolbarStyles()
  const { numSelected, title, active, id } = props

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
      ></div>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default TableToolbar