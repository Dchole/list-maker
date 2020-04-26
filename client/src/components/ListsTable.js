import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { ItemContext } from "../context/ItemContext"
import { Checkbox } from "@material-ui/core"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxHeight: 650
  },
  rowHead: {
    textTransform: "capitalize"
  }
})

const ListsTable = () => {
  const classes = useStyles()
  const { state } = useContext(ItemContext)

  return (
    <Container>
      <TableContainer className={classes.table} component={Paper}>
        <Table stickyHeader aria-label="List Table">
          <TableHead className={classes.rowHead}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  // checked={isItemSelected}
                  color="primary"
                  inputProps={{ "aria-label": "select all" }}
                />
              </TableCell>
              {Object.keys(state[0]).map(item => (
                <TableCell key={item} align="left">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map(row => (
              <TableRow key={row.id} hover role="checkbox">
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={isItemSelected}
                    color="primary"
                    inputProps={{ "aria-labelledby": row.id }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell scope="row" align="left">
                  {row.content}
                </TableCell>
                <TableCell align="left">{row.fullName}</TableCell>
                <TableCell align="left">{row.date} minutes ago</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ListsTable
