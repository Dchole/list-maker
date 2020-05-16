import React, { createContext, useEffect, useReducer, useState } from "react"
import { userReducer } from "../reducers/userReducer"
import {
  getRefreshToken,
  fetchUser,
  login,
  register,
  logout
} from "./api/UserAPI"
import { useHistory } from "react-router-dom"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const history = useHistory()
  const initialState = {
    token: null,
    isAuthenticated: false,
    user: {},
    feedback: {}
  }

  const [state, dispatch] = useReducer(userReducer, initialState)
  const [userLoading, setUserLoading] = useState(true)

  const registerUser = async credentials => {
    try {
      setUserLoading(true)

      const { res } = await register(credentials)

      dispatch({ type: "REGISTER_SUCCESSFUL", payload: res })
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setUserLoading(false)
    }
  }

  const loginUser = async credentials => {
    try {
      setUserLoading(true)
      const {
        res: { data }
      } = await login(credentials)

      const { res: user } = await fetchUser(data.accessToken)

      dispatch({ type: "LOGIN_SUCCESSFUL", payload: data.message })
      dispatch({ type: "SET_TOKEN", payload: data.accessToken })
      dispatch({ type: "FETCH_USER", payload: user.data.user })

      history.replace("/")
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setUserLoading(false)
    }
  }

  const exitApp = async () => {
    try {
      const {
        res: { data }
      } = await logout()
      dispatch({ type: "LOGOUT", payload: data.message })
      state.isAuthenticated = false
      history.replace("/login")
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  useEffect(() => {
    const updatedState = async () => {
      try {
        setUserLoading(true)
        const { res: token } = await getRefreshToken()
        const { res: user } = await fetchUser(token.data.accessToken)
        dispatch({ type: "SET_TOKEN", payload: token.data.accessToken })
        dispatch({ type: "FETCH_USER", payload: user.data.user })
      } catch (error) {
        console.log(error)
      } finally {
        setUserLoading(false)
      }
    }
    updatedState()
  }, [])

  useEffect(() => {
    dispatch({ type: "DEFAULT", payload: initialState })
  }, [history.location.pathname])

  return (
    <UserContext.Provider
      value={{ state, registerUser, loginUser, userLoading, exitApp }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
