import React, { createContext, useReducer, useEffect, useState } from "react"
import { listReducer } from "../reducers/listReducer"
import { fetchLists, createList, deleteList, updateList } from "./api/ListsAPI"
import { getRefreshToken } from "./api/UserAPI"
import { useHistory } from "react-router-dom"

export const ListContext = createContext()

const ListContextProvider = ({ children }) => {
  const history = useHistory()
  const initialState = { feedback: null, lists: [] }
  const [state, dispatch] = useReducer(listReducer, initialState)
  const [listLoading, setListLoading] = useState(true)

  useEffect(() => {
    const updateState = async () => {
      try {
        setListLoading(true)
        const { res } = await getRefreshToken()
        const { lists } = await fetchLists(res.data.accessToken)
        dispatch({ type: "FETCH_LISTS", payload: lists })
      } catch (error) {
        dispatch({ type: "FAILURE", payload: error.response })
      } finally {
        setListLoading(false)
      }
    }
    updateState()
  }, [])

  const createNewList = async body => {
    try {
      setListLoading(true)
      const { res } = await getRefreshToken()
      const { savedList } = await createList(res.data.accessToken, body)
      dispatch({ type: "CREATE_LIST", payload: { list: savedList } })

      const route = `/lists/${savedList._id}`
      history.push(route)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setListLoading(false)
    }
  }

  const addToList = async list => {
    try {
      setListLoading(true)
      await updateList(list)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setListLoading(false)
    }
  }

  const removeList = async id => {
    try {
      setListLoading(true)
      const { res } = await getRefreshToken()
      const { message } = await deleteList(res.data.accessToken, id)
      dispatch({ type: "DELETE_LIST", payload: message })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: "FAILURE", payload: error.response })
    } finally {
      setListLoading(false)
    }
  }

  return (
    <ListContext.Provider
      value={{ state, createNewList, removeList, listLoading, addToList }}
    >
      {children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
