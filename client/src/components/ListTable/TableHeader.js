import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const TableHeader = ({ selectAll, numSelected, rowCount, headLabels }) => {
  return (
    <TableHead>
      <TableRow style={{ textTransform: "capitalize" }}>
        <TableCell padding="checkbox" style={{ background: "#f4f4f4" }}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={selectAll}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headLabels.map((label, index) => (
          <TableCell key={index} align="left" style={{ background: "#f4f4f4" }}>
            <Typography variant="body1">{label}</Typography>
          </TableCell>
        ))}
        <TableCell align="left" style={{ background: "#f4f4f4" }}>
          <Typography variant="body1">Time</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
