import React, { useState, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"

const AdminForm = ({ setExpanded, setDisplay }) => {
  const [fields, setFields] = useState("Full Name, ")
  const [addedFields, setAddedFields] = useState([])

  useEffect(() => {
    const handleAdd = () => {
      setAddedFields(fields.split(",").map(field => field.trim()))
    }
    if (!fields.endsWith(",")) {
      handleAdd()
    }
  }, [fields])

  const handleCancel = () => {
    setFields("Full Name, ")
    setExpanded(false)
    setDisplay(true)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const nonEmptyFields = addedFields.filter(field => field !== "")
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={fields}
        onChange={e => setFields(e.target.value)}
        size="small"
        fullWidth
      />
      <div style={{ marginBottom: 25 }}>
        {addedFields.map((field, index) => (
          <Chip
            key={field + index}
            label={field}
            style={{ margin: "10px 10px 0 0" }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="primary" size="small" type="submit">
          Done
        </Button>
      </div>
    </form>
  )
}

export default AdminForm
