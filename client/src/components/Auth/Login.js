import React, { useState, useContext } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { Link as RouterLink } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(5),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn() {
  const classes = useStyles()
  const { loginUser } = useContext(UserContext)
  const [state, setState] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInput = event => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    loginUser(state)
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={state.email}
          onChange={handleInput}
        />
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="password">Password*</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={state.password}
            onChange={handleInput}
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
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link variant="body2">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
