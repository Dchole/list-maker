import React, { useState } from "react"
import clsx from "clsx"
import { lighten, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import Feedback from "./Feedback"

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, headLabels } = props

  return (
    <TableHead>
      <TableRow style={{ textTransform: "capitalize", fontWeight: "bold" }}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headLabels.map((label, index) => (
          <TableCell key={index} align="left">
            {label}
          </TableCell>
        ))}
        <TableCell align="left">Time</TableCell>
      </TableRow>
    </TableHead>
  )
}

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
    borderRadius: "50%",
    marginRight: theme.spacing(1)
  },
  active: {
    backgroundColor: theme.palette.success.main
  },
  notActive: {
    backgroundColor: theme.palette.error.main
  }
}))

const EnhancedTableToolbar = props => {
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
        >
          {title}
        </Typography>
      )}
      <div style={{ flexGrow: 1 }}>
        <Button variant="outlined" size="small" color="primary" onClick={copy}>
          Get Link
        </Button>
        <Feedback open={open} setOpen={setOpen} />
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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}))

export default function ListsTable({ title, fields, members, active, id }) {
  const classes = useStyles()
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = members.map(member => member.info[0])
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = name => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    console.log(selected)

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={title}
          active={active}
          id={id}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={members.length}
              headLabels={fields}
            />
            <TableBody>
              {members.map((member, index) => {
                const isItemSelected = isSelected(member.info[0])
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(member.info[0])}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={member.info[0] + index}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    {member.info.map((info, index) => (
                      <TableCell key={index} align="left">
                        {info}
                      </TableCell>
                    ))}
                    <TableCell align="left">
                      {Math.abs(
                        new Date().getMinutes() -
                          new Date(member.time).getMinutes()
                      )}
                      &nbsp;minutes ago
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={members.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
