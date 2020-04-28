import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Homepage from "./pages/Homepage"
import { Route, Switch } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

const App = () => (
  <>
    <CssBaseline />
    <Switch>
      <Route path="/" component={Homepage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </>
)

export default App
