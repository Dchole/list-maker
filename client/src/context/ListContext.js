import React, { createContext, useReducer, useEffect } from "react"
import { listReducer } from "../reducers/listReducer"
import { fetchLists, createList, deleteList } from "./api/ListsAPI"
import { getRefreshToken } from "./api/UserAPI"

export const ListContext = createContext()

const ListContextProvider = ({ children }) => {
  const initialState = []
  const [state, dispatch] = useReducer(listReducer, initialState)

  useEffect(() => {
    const updateState = async () => {
      try {
        const { res } = await getRefreshToken()
        const { lists } = await fetchLists(res.data.accessToken)
        dispatch({ type: "FETCH_LISTS", payload: lists })
      } catch (error) {
        dispatch({ type: "FAILURE", payload: error.response })
      }
    }
    updateState()
  }, [])

  const createNewList = async body => {
    try {
      const { res } = await getRefreshToken()
      const { message } = await createList(res.data.accessToken, body)
      dispatch({ type: "CREATE_LIST", payload: message })
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  const removeList = async id => {
    try {
      const { res } = await getRefreshToken()
      const { message } = await deleteList(res.data.accessToken, id)
      dispatch({ type: "DELETE_LIST", payload: message })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  return (
    <ListContext.Provider value={{ state, createNewList, removeList }}>
      {children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
