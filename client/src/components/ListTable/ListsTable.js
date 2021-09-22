import PropTypes from "prop-types"
import React, { useState, useContext, useEffect } from "react"
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
import Feedback from "../Feedback/Feedback"
import ConfirmMember from "./ConfirmMember"
import { ListContext } from "../../context/ListContext"
import { timeDecoration } from "../util/timeDecoration"
import { useStyles } from "./styles/listsTable"

const socket =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? io(window.location.host)
    : io("localhost:5000")

/**
 * @param {import("prop-types").InferProps<ListsTable.propTypes>} props
 */
export default function ListsTable({ list }) {
  const { title, fields, members, active, _id } = list

  const classes = useStyles()
  const [status, setStatus] = useState(active)
  const [selected, setSelected] = React.useState([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { changeListStatus, socketUpdate } = useContext(ListContext)

  useEffect(() => {
    socket.emit("setStatus")

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [status])

  useEffect(() => {
    socket.on("addedToList", newMembers => {
      list.members = newMembers
      socketUpdate(list)
    })

    return () => {
      socket.off()
    }
  })

  /**
   * @param {string} name
   */
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
    setSelected(newSelected)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = members.map(member => member._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const isSelected = member => selected.indexOf(member) !== -1

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
        <ConfirmMember
          open={dialogOpen}
          setOpen={setDialogOpen}
          selected={selected}
          list={list}
          setSelected={setSelected}
        />
        <TableToolbar
          handleDelete={() => setDialogOpen(true)}
          numSelected={selected.length}
          title={title}
          active={status}
          id={_id}
        />
        <TableContainer style={{ maxHeight: 430 }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="list table"
            stickyHeader
          >
            <TableHeader
              // classes={{ ...classes }}
              rowCount={list.members.length}
              headLabels={fields}
              selectAll={handleSelectAllClick}
              numSelected={selected.length}
            />
            <TableBody>
              {list.members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  const isItemSelected = isSelected(member._id)

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(member._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          inputProps={{
                            "aria-labelledby": labelId,
                            "aria-label": `Select ${member.info[0]}`
                          }}
                          checked={isItemSelected}
                        />
                      </TableCell>
                      {member.info.map((info, index) => (
                        <TableCell
                          key={index}
                          style={
                            index === 0 ? { textTransform: "capitalize" } : null
                          }
                          align="left"
                        >
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
            <IconButton
              onClick={handleStatusUpdate}
              aria-label={status ? "deactivate list" : "activate list"}
            >
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
            count={list.members.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={event => setRowsPerPage(+event.target.value)}
          />
        </div>
      </Paper>
    </div>
  )
}

ListsTable.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    active: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired
  })
}
