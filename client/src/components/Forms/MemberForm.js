import React, { useState, useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Backdrop from "@material-ui/core/Backdrop"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Alert from "@material-ui/lab/Alert"
import { ListContext } from "../../context/ListContext"
import { useParams } from "react-router"
import { fetchList } from "../../context/api/ListsAPI"
import { UserContext } from "../../context/UserContext"
import { memberValidation } from "./formValidation"
import Feedback from "../Feedback"
import io from "socket.io-client"

const socket = io("localhost:5000")

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10)
  },
  alert: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 50000
  },
  paper: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4, 4, 6, 4)
  }
}))

export default function MemberForm() {
  const params = useParams()
  const classes = useStyles()

  const {
    state: { user }
  } = useContext(UserContext)

  const { addToList } = useContext(ListContext)
  const [list, setList] = useState({})
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [sent, setSent] = useState(false)
  const [fullname, setFullname] = useState({
    firstname: "",
    lastname: ""
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { list } = await fetchList(params.id)
        setList(list)
        list.fields.forEach(field => {
          const createdFieldName = field
          setForm(prevForm => ({ ...prevForm, [createdFieldName]: "" }))

          user.fullName &&
            setFullname({
              firstname: user.fullName.split(" ")[0],
              lastname: user.fullName.split(" ")[1]
            })
        })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [params.id, user.fullName])

  useEffect(() => {
    socket.on("statusChanged", () => {
      window.location.reload()
    })

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [])

  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      "Full Name": `${fullname.firstname} ${fullname.lastname}`
    }))
  }, [fullname])

  const handlefullnameInput = event => {
    setFullname({ ...fullname, [event.target.name]: event.target.value })
  }

  const handleInput = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validateMember = () => {
    const validation = memberValidation(
      form,
      fullname.firstname,
      fullname.lastname
    )
    setErrors(validation)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setAdding(true)
    const noErrors = Object.keys(errors).length === 0
    if (noErrors) {
      const socketMembers = [
        ...list.members,
        {
          _id: String(Math.random() * Math.random()),
          info: Object.values(form),
          time: new Date()
        }
      ]

      list.members.push({
        info: Object.values(form),
        time: new Date()
      })

      addToList(list)
      socket.emit("addToList", socketMembers)
    }
    setAdding(false)
    setSent(true)
  }

  if (loading)
    return (
      <Backdrop open={loading} style={{ color: "white" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  return (
    <div>
      {!list.active ? (
        <Alert severity="error" className={classes.alert}>
          List has been activated :(. Contact your admin for details
        </Alert>
      ) : (
        <Container component="main" maxWidth="sm" className={classes.root}>
          <Typography
            align="center"
            variant="h4"
            component="h1"
            id="form-title"
          >
            Add To List
          </Typography>
          <Paper className={classes.paper}>
            <div style={{ marginBottom: 10 }}>
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={6} style={{ marginBottom: 20 }}>
                    <TextField
                      error={errors.firstname ? true : false}
                      helperText={errors.firstname}
                      id="firstname"
                      name="firstname"
                      type="text"
                      label="First Name"
                      style={{ textTransform: "capitalize" }}
                      autoFocus
                      value={fullname.firstname}
                      onChange={handlefullnameInput}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} style={{ marginBottom: 20 }}>
                    <TextField
                      error={errors.lastname ? true : false}
                      helperText={errors.lastname}
                      id="lastname"
                      name="lastname"
                      type="text"
                      label="Last Name"
                      style={{ textTransform: "capitalize" }}
                      value={fullname.lastname}
                      onChange={handlefullnameInput}
                      fullWidth
                    />
                  </Grid>
                  {list.fields
                    .slice(1, list.fields.length)
                    .map((label, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        style={{ marginBottom: 20 }}
                      >
                        <TextField
                          error={errors[label] ? true : false}
                          helperText={errors[label]}
                          id={label}
                          name={label}
                          type={
                            label.toLowerCase() === "email" ? "email" : "text"
                          }
                          label={label}
                          style={{ textTransform: "capitalize" }}
                          value={form[label]}
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
                    aria-label="Add your info"
                    onClick={validateMember}
                    disabled={adding}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </Paper>
          <Feedback
            open={sent}
            setOpen={setSent}
            message="Your info was sent succesfully ✔"
          />
        </Container>
      )}
    </div>
  )
}
