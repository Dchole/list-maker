/* eslint-disable no-undef */
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import UserContextProvider from "./context/UserContext"
import ListContextProvider from "./context/ListContext"

if (process.env.NODE_ENV !== "production") {
  const axe = require("react-axe")
  axe(React, ReactDOM, 1000)
}

const RootComponent = () => (
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

const rootElement = document.getElementById("root")

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<RootComponent />, rootElement)
} else {
  ReactDOM.render(<RootComponent />, rootElement)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
