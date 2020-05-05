import React, { createContext, useEffect, useReducer, useState } from "react"
import { userReducer } from "../reducers/userReducer"
import { getRefreshToken, fetchUser, login, register } from "./api/UserAPI"
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

      const {
        res: { data }
      } = await register(credentials)

      dispatch({ type: "REGISTER_SUCCESSFUL", payload: data.message })
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
      console.log(error)
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setUserLoading(false)
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
        console.log(error.response)
        dispatch({ type: "FAILURE", payload: error.response })
      } finally {
        setUserLoading(false)
      }
    }
    updatedState()
  }, [])

  return (
    <UserContext.Provider
      value={{ state, registerUser, loginUser, userLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
