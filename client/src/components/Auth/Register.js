import React, { useContext } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"
import useFormValidation from "../FormValidation/useFormValidation"
import { UserContext } from "../../context/UserContext"
import { registerValidation } from "../FormValidation/validationAuth"
import { Link as RouterLink } from "react-router-dom"
import { useStyles } from "./styles/register"

export const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

export default function SignUp() {
  const classes = useStyles()

  const {
    loading: { authLoading }
  } = useContext(UserContext)

  const {
    handleRegisterInput,
    handleRegisterSubmit,
    validateRegister,
    registerErrors,
    registerValues
    // @ts-ignore
  } = useFormValidation(initialState, registerValidation)

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form
        id="sign-up"
        name="sign-up"
        className={classes.form}
        onSubmit={handleRegisterSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={Boolean(registerErrors.firstName)}
              helperText={registerErrors.firstName}
              autoComplete="given-name"
              name="firstName"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              autoCapitalize="word"
              value={registerValues.firstName}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={Boolean(registerErrors.lastName)}
              helperText={registerErrors.lastName}
              autoComplete="family-name"
              name="lastName"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              autoCapitalize="word"
              value={registerValues.lastName}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(registerErrors.email)}
              helperText={registerErrors.email}
              autoComplete="email"
              name="email"
              variant="outlined"
              type="email"
              required
              fullWidth
              id="email"
              label="Email"
              value={registerValues.email}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(registerErrors.password)}
              helperText={registerErrors.password}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={registerValues.password}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={Boolean(registerErrors.confirmPassword)}
              helperText={registerErrors.confirmPassword}
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              autoComplete="new-password"
              value={registerValues.confirmPassword}
              onChange={handleRegisterInput}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={validateRegister}
          disabled={authLoading}
        >
          {authLoading ? <CircularProgress size={25} /> : "Sign Up"}
        </Button>
        <Grid container justifyContent="flex-end">
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
