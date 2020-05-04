import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import TableToolbar from "./ListTable/TableToolbar"
import TableHeader from "./ListTable/TableHeader"

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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title={title} active={active} id={id} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHeader
              classes={classes}
              rowCount={members.length}
              headLabels={fields}
            />
            <TableBody>
              {members.map((member, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={member.info[0] + index}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox inputProps={{ "aria-labelledby": labelId }} />
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
        />
      </Paper>
    </div>
  )
}
