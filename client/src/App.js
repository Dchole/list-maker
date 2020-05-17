import React, { lazy, Suspense } from "react"
import { Route } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import LinearProgress from "@material-ui/core/LinearProgress"

const App = () => (
  <>
    <CssBaseline />
    <Suspense fallback={<LinearProgress />}>
      <Route
        path="/"
        render={() => {
          const Homepage = lazy(() => import("./pages/Homepage"))
          return <Homepage />
        }}
        exact
      />
    </Suspense>
    <Suspense fallback={<LinearProgress />}>
      <Route
        path="/dashboard"
        render={() => {
          const Dashboard = lazy(() => import("./pages/Dashboard"))
          return <Dashboard />
        }}
        exact
      />
    </Suspense>
    <Suspense fallback={<LinearProgress />}>
      <Route
        path="/register"
        render={() => {
          const RegisterPage = lazy(() => import("./pages/RegisterPage"))
          return <RegisterPage />
        }}
      />
    </Suspense>
    <Suspense fallback={<LinearProgress />}>
      <Route
        path="/login"
        render={() => {
          const LoginPage = lazy(() => import("./pages/LoginPage"))
          return <LoginPage />
        }}
      />
    </Suspense>
    <Suspense fallback={<LinearProgress />}>
      <Route
        path="/lists/:id"
        render={() => {
          const ListPage = lazy(() => import("./pages/ListPage"))
          return <ListPage />
        }}
      />
    </Suspense>
    <Suspense fallback={<LinearProgress />}>
      <Route
        path="/add/:id"
        render={() => {
          const InputPage = lazy(() => import("./pages/InputPage"))
          return <InputPage />
        }}
      />
    </Suspense>
  </>
)

export default App
