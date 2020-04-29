import React, { lazy, Suspense } from "react"
import { Route } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import CircularProgress from "@material-ui/core/CircularProgress"

const Homepage = lazy(() => import("./pages/Homepage"))

const App = () => (
  <>
    <CssBaseline />
    <Suspense fallback={<CircularProgress />}>
      <Route path="/" component={Homepage} exact />
    </Suspense>
    <Route path="/register" component={RegisterPage} />
    <Route path="/login" component={LoginPage} />
  </>
)

export default App
