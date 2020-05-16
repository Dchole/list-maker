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
  const [loading, setLoading] = useState({
    userLoading: true,
    authLoading: false
  })

  const registerUser = async credentials => {
    try {
      setLoading({ ...loading, authLoading: true })

      const { res } = await register(credentials)

      dispatch({ type: "REGISTER_SUCCESSFUL", payload: res })
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setLoading({ ...loading, authLoading: false })
    }
  }

  const loginUser = async credentials => {
    try {
      setLoading({ ...loading, authLoading: true })
      const { res } = await login(credentials)
      console.log(res)

      const { res: user } = await fetchUser(res.data.accessToken)

      dispatch({ type: "LOGIN_SUCCESSFUL", payload: res })
      dispatch({ type: "SET_TOKEN", payload: res.data.accessToken })
      dispatch({ type: "FETCH_USER", payload: user.data.user })

      history.replace("/")
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setLoading({ ...loading, authLoading: false })
    }
  }

  const exitApp = async () => {
    try {
      setLoading({ ...loading, authLoading: true })
      const {
        res: { data }
      } = await logout()
      dispatch({ type: "LOGOUT", payload: data.message })
      state.isAuthenticated = false
      history.replace("/login")
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setLoading({ ...loading, authLoading: false })
    }
  }

  useEffect(() => {
    const updatedState = async () => {
      try {
        setLoading(l => ({ ...l, userLoading: true }))
        const { res: token } = await getRefreshToken()
        const { res: user } = await fetchUser(token.data.accessToken)
        dispatch({ type: "SET_TOKEN", payload: token.data.accessToken })
        dispatch({ type: "FETCH_USER", payload: user.data.user })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(l => ({ ...l, userLoading: false }))
      }
    }
    updatedState()
  }, [])

  useEffect(() => {
    dispatch({ type: "DEFAULT", payload: {} })
  }, [history.location.pathname])

  return (
    <UserContext.Provider
      value={{ state, registerUser, loginUser, loading, exitApp }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
