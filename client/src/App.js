import React, { lazy, Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import LinearProgress from "@material-ui/core/LinearProgress"
import Homepage from "./pages/Homepage"
import ErrorBoundary from "./components/ErrorBoundary"

const Dashboard = lazy(() => import("./pages/Dashboard"))
const RegisterPage = lazy(() => import("./pages/Registerpage"))
const LoginPage = lazy(() => import("./pages/Loginpage"))
const ListPage = lazy(() => import("./pages/ListPage"))
const InputPage = lazy(() => import("./pages/InputPage"))

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<LinearProgress />}>
      <CssBaseline />
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/lists/:id" component={ListPage} />
        <Route path="/add/:id" component={InputPage} />
      </Switch>
    </Suspense>
  </ErrorBoundary>
)

export default App
