import React, { useState, useContext } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import useFormValidation from "../FormValidation/useFormValidation"
import { UserContext } from "../../context/UserContext"
import { loginValidation } from "../FormValidation/validationAuth"
import { Link as RouterLink } from "react-router-dom"
import { useStyles } from "./styles/login"

export const initialState = {
  email: "",
  password: ""
}

export default function SignIn() {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  const {
    loading: { authLoading }
  } = useContext(UserContext)

  const {
    handleLoginInput,
    handleLoginSubmit,
    validateLogin,
    loginErrors,
    loginValues
  } = useFormValidation(initialState, loginValidation)

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleLoginSubmit}>
        <TextField
          error={Boolean(loginErrors.email)}
          helperText={loginErrors.email}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={loginValues.email}
          onChange={handleLoginInput}
        />
        <FormControl
          // className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          fullWidth
        >
          <InputLabel
            htmlFor="password"
            style={loginErrors.password ? { color: "red" } : null}
          >
            Password*
          </InputLabel>
          <OutlinedInput
            error={Boolean(loginErrors.password)}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={loginValues.password}
            onChange={handleLoginInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText style={{ color: "red" }}>
            {loginErrors.password}
          </FormHelperText>
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={validateLogin}
          disabled={authLoading}
        >
          {authLoading ? <CircularProgress size={25} /> : "Sign In"}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
