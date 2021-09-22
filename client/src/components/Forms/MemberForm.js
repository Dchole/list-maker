import PropTypes from "prop-types"
import React, { useState, useContext } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { ListContext } from "../../context/ListContext"
import { memberValidation } from "../FormValidation/formValidation"
import Feedback from "../Feedback/Feedback"
import { useStyles } from "./styles/memberForm"

/**
 * @param {import("prop-types").InferType<MemberForm.propTypes>} props
 */
const MemberForm = ({ fullName, form, setForm, list, socket, setFullName }) => {
  const classes = useStyles()

  const {
    loading: { actionLoading },
    addToList
  } = useContext(ListContext)

  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState(fullName)
  const [open, setOpen] = useState(false)

  const handlefullNameInput = event => {
    setFullName({ ...fullName, [event.target.name]: event.target.value })
  }

  const handleInput = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validateMember = () => {
    const validation = memberValidation(
      form,
      fullName.firstName,
      fullName.lastName
    )
    setErrors(validation)
  }

  const handleSubmit = event => {
    event.preventDefault()
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
      setSent(true)
      setOpen(true)
    }
  }

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Typography align="center" variant="h4" component="h1" id="form-title">
        {!list.active ? "Sorry :(" : "Add To List"}
      </Typography>
      {!list.active ? (
        <Paper color="primary" className={classes.paper}>
          <Typography variant="overline" color="error">
            List has been deactivated. Contact your admin for details
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <div style={{ marginBottom: 10 }}>
            <form
              onSubmit={handleSubmit}
              className={sent ? classes.form : null}
            >
              <Grid container>
                <Grid item xs={12} sm={6} style={{ marginBottom: 20 }}>
                  <TextField
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="First Name"
                    style={{ textTransform: "capitalize" }}
                    value={fullName.firstName}
                    onChange={handlefullNameInput}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginBottom: 20 }}>
                  <TextField
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Last Name"
                    style={{ textTransform: "capitalize" }}
                    value={fullName.lastName}
                    onChange={handlefullNameInput}
                    fullWidth
                  />
                </Grid>
                {list.fields
                  .slice(1, list.fields.length)
                  .map((label, index) => (
                    <Grid key={index} item xs={12} style={{ marginBottom: 20 }}>
                      <TextField
                        error={Boolean(errors[label])}
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
              <div
                style={{
                  // @ts-ignore
                  cssFloat: "right"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  aria-label="Add your info"
                  onClick={validateMember}
                  disabled={actionLoading}
                >
                  {actionLoading ? <CircularProgress size={25} /> : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      )}
      <Feedback
        open={open}
        setOpen={setOpen}
        message="Your info was sent succesfully ✔"
      />
    </Container>
  )
}

MemberForm.propTypes = {
  fullName: PropTypes.exact({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  form: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  setForm: PropTypes.func.isRequired,
  list: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired))
      .isRequired
  }),
  socket: PropTypes.any,
  setFullName: PropTypes.func.isRequired
}

export default MemberForm
