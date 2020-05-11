import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext
} from "react"
import { listReducer } from "../reducers/listReducer"
import { fetchLists, createList, deleteList, updateList } from "./api/ListsAPI"
import { getRefreshToken } from "./api/UserAPI"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserContext"

export const ListContext = createContext()

const ListContextProvider = ({ children }) => {
  const history = useHistory()
  const initialState = { feedback: null, lists: [] }

  const [state, dispatch] = useReducer(listReducer, initialState)

  const {
    state: { isAuthenticated }
  } = useContext(UserContext)

  const [listLoading, setListLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
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
    })()
  }, [isAuthenticated])

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
      await updateList(list)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  const socketUpdate = list => dispatch({ type: "ADD_MEMBER", payload: list })

  const removeMember = async list => {
    try {
      await updateList(list)
      dispatch({ type: "DELETE_MEMBER", payload: list })
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  const changeListStatus = async list => {
    try {
      await updateList(list)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  const removeList = async id => {
    try {
      const { res } = await getRefreshToken()
      const { message } = await deleteList(res.data.accessToken, id)
      dispatch({ type: "DELETE_LIST", message, id })
      history.replace("/dashboard")
    } catch (error) {
      console.log(error.response)
      dispatch({ type: "FAILURE", payload: error.response })
    }
  }

  return (
    <ListContext.Provider
      value={{
        state,
        createNewList,
        removeList,
        removeMember,
        listLoading,
        addToList,
        socketUpdate,
        changeListStatus
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

export default ListContextProvider
