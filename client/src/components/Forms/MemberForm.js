import React, { useState, useContext, useEffect } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Alert from "@material-ui/lab/Alert"
import { ListContext } from "../../context/ListContext"
import { useParams } from "react-router"
import { fetchList } from "../../context/api/ListsAPI"
import io from "socket.io-client"

let socket

const alertStyle = {
  position: "absolute",
  top: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  zIndex: 50000
}

export default function MemberForm() {
  const params = useParams()

  const { addToList } = useContext(ListContext)
  const [list, setList] = useState({})
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)

  const fieldName = field => field.split(" ").join("").toLowerCase()

  useEffect(() => {
    ;(async () => {
      try {
        const { list } = await fetchList(params.id)
        setList(list)
        list.fields.forEach(field => {
          const createdFieldName = fieldName(field)
          setForm(prevForm => ({ ...prevForm, [createdFieldName]: "" }))
        })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [params.id])

  useEffect(() => {
    socket = io("localhost:5000")
  })

  const handleInput = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    list.members.push({ info: Object.values(form), time: new Date() })
    addToList(list)
    socket.emit("addToList", list.members)
  }

  if (loading) return <CircularProgress />

  return (
    <div>
      {!list.active && (
        <Alert severity="error" style={alertStyle}>
          List has been activated :( ...Contact your admin for details
        </Alert>
      )}
      <Dialog open aria-labelledby="form-dialog-title">
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!list.active}
              >
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
