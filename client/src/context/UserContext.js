import PropTypes from "prop-types"
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
import { setAccessToken } from "./api/token.config"

export const initialState = {
  isAuthenticated: false,
  user: {},
  feedback: {}
}

/**
 * @typedef {Object} Props
 * @property {typeof initialState} state
 * @property {{ userLoading: boolean; authLoading: boolean; }} loading
 * @property {(credentials: any) => Promise<void>} registerUser
 * @property {(credentials: any) => Promise<void>} loginUser
 * @property {() => Promise<void>} exitApp
 */

/**
 * @type {Partial<Props>}
 */
const defaultContext = {}
export const UserContext = createContext(defaultContext)

/**
 * @type {React.FC}
 */
const UserContextProvider = ({ children }) => {
  const history = useHistory()

  const [state, dispatch] = useReducer(userReducer, initialState)
  const [loading, setLoading] = useState({
    userLoading: true,
    authLoading: false
  })

  const registerUser = async credentials => {
    try {
      setLoading({ ...loading, authLoading: true })

      const { message } = await register(credentials)
      dispatch({ type: "REGISTER_SUCCESSFUL", payload: message })
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, authLoading: false })
    }
  }

  const loginUser = async credentials => {
    try {
      setLoading({ ...loading, authLoading: true })

      const { accessToken, message } = await login(credentials)
      setAccessToken(accessToken)
      const { user } = await fetchUser(accessToken)

      dispatch({ type: "SET_AUTHENTICATED", payload: true })
      dispatch({ type: "LOGIN_SUCCESSFUL", payload: message })
      dispatch({ type: "FETCH_USER", payload: user })

      history.replace("/")
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, authLoading: false })
    }
  }

  const exitApp = async () => {
    try {
      setLoading({ ...loading, authLoading: true })

      const { message } = await logout()
      dispatch({ type: "LOGOUT", payload: message })

      dispatch({ type: "SET_AUTHENTICATED", payload: false })
      history.replace("/login")
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, authLoading: false })
    }
  }

  useEffect(() => {
    const initialRequest = async () => {
      try {
        setLoading(l => ({ ...l, userLoading: true }))

        const { accessToken } = await getRefreshToken()
        setAccessToken(accessToken)
        const { user } = await fetchUser(accessToken)
        dispatch({ type: "SET_AUTHENTICATED", payload: true })
        dispatch({ type: "FETCH_USER", payload: user })
      } catch (error) {
        dispatch({ type: "FAILURE", payload: error.response?.data.message })
      } finally {
        setLoading(l => ({ ...l, userLoading: false }))
      }
    }

    initialRequest()
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

UserContextProvider.propTypes = {
  children: PropTypes.node
}

export default UserContextProvider
