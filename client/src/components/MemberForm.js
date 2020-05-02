import React, { useState, useContext, useEffect } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import { ListContext } from "../context/ListContext"
import { useParams } from "react-router"

export default function MemberForm() {
  const params = useParams()

  const {
    state: { lists },
    listLoading,
    addToList
  } = useContext(ListContext)

  const list = lists.find(list => list._id === params.id)

  const [form, setForm] = useState({})
  const [open, setOpen] = useState(false)

  const fieldName = field => field.split(" ").join("").toLowerCase()

  useEffect(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    if (list) {
      list.fields.forEach(field => {
        const createdFieldName = fieldName(field)
        setForm(prevForm => ({ ...prevForm, [createdFieldName]: "" }))
      })
    }
  }, [list])

  const handleInput = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    list.members.push({ info: Object.values(form) })
    addToList(list)
  }

  if (listLoading) return <CircularProgress />

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add To List</DialogTitle>
        <DialogContent style={{ marginBottom: 10 }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              {list.fields.map((label, index) => (
                <Grid key={index} item xs={12} style={{ marginBottom: 20 }}>
                  <TextField
                    id={label}
                    name={fieldName(label)}
                    type={label.toLowerCase() === "email" ? "email" : "text"}
                    label={label}
                    style={{ textTransform: "capitalize" }}
                    autoFocus={index === 0 ? true : false}
                    value={form[fieldName(label)]}
                    onChange={handleInput}
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>
            <div style={{ float: "right" }}>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
