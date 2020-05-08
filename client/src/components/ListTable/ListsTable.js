import React, { useState, useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import ActivateIcon from "@material-ui/icons/PlayCircleOutlineRounded"
import DeactivateIcon from "@material-ui/icons/PowerSettingsNew"
import io from "socket.io-client"
import TableToolbar from "./TableToolbar"
import TableHeader from "./TableHeader"
import Feedback from "../Feedback"
import { ListContext } from "../../context/ListContext"
import { timeDecoration } from "../util/timeDecoration"

let socket

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

export default function ListsTable({ list }) {
  const { title, fields, members, active, _id } = list

  const classes = useStyles()
  const [listMembers, setListMembers] = useState(members)
  const [status, setStatus] = useState(active)
  const [selected, setSelected] = React.useState([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { changeListStatus } = useContext(ListContext)

  useEffect(() => {
    socket = io("localhost:5000")

    if (!status) {
      socket.emit("disconnect")
      socket.off()
    }

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [status])

  useEffect(() => {
    socket.on("addedToList", newMembers => {
      setListMembers([...newMembers])
      console.log(newMembers)
    })
  })

  const handleClick = (event, index) => {
    let newSelected = []

    if (index === -1) {
      newSelected = newSelected.concat(selected, index)
    } else if (index === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (index === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (index > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, index),
        selected.slice(index + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = members.map(member => member.fullname)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const isSelected = index => selected.includes(index)

  const handleStatusUpdate = () => {
    const listCopy = { ...list }
    listCopy.active = !status
    changeListStatus(listCopy)
    setStatus(!status)
    setOpen(true)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title={title} active={status} id={_id} />
        <TableContainer style={{ maxHeight: 400 }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="list table"
            stickyHeader
          >
            <TableHeader
              classes={classes}
              rowCount={listMembers.length}
              headLabels={fields}
            />
            <TableBody>
              {listMembers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, index)}
                      role="checkbox"
                      aria-checked={isSelected(index)}
                      tabIndex={-1}
                      key={index}
                      selected={isSelected(index)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          inputProps={{ "aria-labelledby": labelId }}
                          checked={isSelected(index)}
                        />
                      </TableCell>
                      {member.info.map((info, index) => (
                        <TableCell key={index} align="left">
                          {info}
                        </TableCell>
                      ))}
                      <TableCell align="left">
                        {timeDecoration(member.time)}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flexGrow: 1, marginLeft: 10 }}>
            <IconButton onClick={handleStatusUpdate}>
              {status ? (
                <DeactivateIcon color="secondary" />
              ) : (
                <ActivateIcon style={{ color: "green" }} />
              )}
            </IconButton>
            <Feedback
              open={open}
              setOpen={setOpen}
              message={`List has been ${status ? "activated" : "deactivated"}.`}
            />
          </div>
          <TablePagination
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listMembers.length}
            page={page}
            onChangePage={(e, newPage) => setPage(newPage)}
            onChangeRowsPerPage={event => setRowsPerPage(+event.target.value)}
          />
        </div>
      </Paper>
    </div>
  )
}
