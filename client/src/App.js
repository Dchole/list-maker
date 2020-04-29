import React from "react"
import { Route } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import Homepage from "./pages/Homepage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"

const App = () => (
  <>
    <CssBaseline />
    <Route path="/" component={Homepage} exact />
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/dashboard" component={Dashboard} />
  </>
)

export default App
