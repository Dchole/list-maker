import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useFormValidation from "../FormValidation/useFormValidation";
import { UserContext } from "../../context/UserContext";
import { registerValidation } from "../FormValidation/validationAuth";
import { Link as RouterLink } from "react-router-dom";

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
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function SignUp() {
  const classes = useStyles();

  const {
    loading: { authLoading }
  } = useContext(UserContext);

  const {
    handleRegisterInput,
    handleRegisterSubmit,
    validateRegister,
    registerErrors,
    registerValues
  } = useFormValidation(initialState, registerValidation);

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleRegisterSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={registerErrors.firstname ? true : false}
              helperText={registerErrors.firstname}
              autoComplete="first name"
              name="firstName"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={registerValues.firstName}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={registerErrors.lastname ? true : false}
              helperText={registerErrors.lastname}
              autoComplete="last name"
              name="lastName"
              variant="outlined"
              type="text"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              value={registerValues.lastName}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={registerErrors.email ? true : false}
              helperText={registerErrors.email}
              autoComplete="email"
              name="email"
              variant="outlined"
              type="text"
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
              error={registerErrors.password ? true : false}
              helperText={registerErrors.password}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={registerValues.password}
              onChange={handleRegisterInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={registerErrors.confirmPassword ? true : false}
              helperText={registerErrors.confirmPassword}
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm_password"
              autoComplete="confirm password"
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
        <Grid container justify="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
