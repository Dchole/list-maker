import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import useFormValidation from "../FormValidation/useFormValidation"
import validationAuth from "../FormValidation/validationAuth"
import { Link as RouterLink } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: ""
}

export default function SignUp() {
  const classes = useStyles()
  const { handleInput, handleSubmit, errors, values } = useFormValidation(
    initialState,
    validationAuth
  )

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={errors.firstname ? true : false}
              helperText={errors.firstname}
              autoComplete="firstName"
              name="firstName"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={values.firstName}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={errors.lastname ? true : false}
              helperText={errors.lastname}
              autoComplete="lastName"
              name="lastName"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.email ? true : false}
              helperText={errors.email}
              autoComplete="email"
              name="email"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="email"
              label="Email"
              value={values.email}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.password ? true : false}
              helperText={errors.password}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              autoComplete="confirm_password"
              value={values.confirmPassword}
              onChange={handleInput}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
