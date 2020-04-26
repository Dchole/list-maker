import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Homepage from "./pages/Homepage"
import { Route, Switch } from "react-router-dom"

const App = () => (
  <>
    <CssBaseline />
    <Switch>
      <Route path="/" component={Homepage} exact />
    </Switch>
  </>
)

export default App
