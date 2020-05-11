import React from "react"
import { Route } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import Homepage from "./pages/Homepage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import InputPage from "./pages/InputPage"
import ListPage from "./pages/ListPage"

const App = () => (
  <>
    <CssBaseline />
    <Route path="/" component={Homepage} exact />
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/lists/:id" component={ListPage} />
    <Route path="/add/:id" component={InputPage} />
  </>
)

export default App
