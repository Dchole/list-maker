import React from "react"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Checkbox from "@material-ui/core/Checkbox"

const TableHeader = ({ selectAll, numSelected, rowCount, headLabels }) => {
  return (
    <TableHead>
      <TableRow style={{ textTransform: "capitalize", backgroundColor: "red" }}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={selectAll}
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

export default TableHeader
