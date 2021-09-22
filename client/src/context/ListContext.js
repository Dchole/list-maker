import PropTypes from "prop-types"
import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext
} from "react"
import { listReducer } from "../reducers/listReducer"
import { createList, deleteList, updateList, fetchLists } from "./api/ListsAPI"
import { useHistory } from "react-router-dom"
import { UserContext } from "./UserContext"
import { getAccessToken } from "./api/token.config"
import { checkTokenExpired } from "./api/checkTokenExpired"

export const initialState = { feedback: null, lists: [] }

/**
 * @typedef {Object} Props
 * @property {typeof initialState} state
 * @property {{ listLoading: boolean; actionLoading: boolean; }} loading
 * @property {(list: any) => Promise<void>} addToList
 * @property {(body: any) => Promise<void>} createNewList
 * @property {(id: any) => Promise<void>} removeList
 * @property {(list: any) => Promise<void>} removeMember
 * @property {(list: any) => void} socketUpdate
 * @property {(list: any) => Promise<void>} changeListStatus
 */

/**
 * @type {Partial<Props>}
 */
const defaultContext = {}
export const ListContext = createContext(defaultContext)

/**
 * @type {React.FC}
 */
const ListContextProvider = ({ children }) => {
  const history = useHistory()

  const [state, dispatch] = useReducer(listReducer, initialState)

  const {
    state: { isAuthenticated }
  } = useContext(UserContext)

  const [loading, setLoading] = useState({
    listLoading: true,
    actionLoading: false
  })

  useEffect(() => {
    const accessToken = getAccessToken()

    ;(async () => {
      if (accessToken && state.lists.length === 0) {
        try {
          setLoading(l => ({ ...l, listLoading: true }))

          const { lists } = await checkTokenExpired(
            accessToken,
            null,
            fetchLists
          )

          dispatch({ type: "FETCH_LISTS", payload: lists })
        } catch (error) {
          dispatch({ type: "FAILURE", payload: error.response?.data.message })
        } finally {
          setLoading(l => ({ ...l, listLoading: false }))
        }
      }
    })()
  }, [state.lists.length, isAuthenticated])

  const createNewList = async body => {
    try {
      setLoading({ ...loading, actionLoading: true })
      const accessToken = getAccessToken()

      const { savedList } = await checkTokenExpired(
        accessToken,
        body,
        createList
      )

      dispatch({ type: "CREATE_LIST", payload: savedList })

      const route = `/lists/${savedList._id}`
      history.push(route)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, actionLoading: false })
    }
  }

  const addToList = async list => {
    try {
      setLoading({ ...loading, actionLoading: true })
      await updateList(list)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, actionLoading: false })
    }
  }

  const socketUpdate = list => dispatch({ type: "ADD_MEMBER", payload: list })

  const removeMember = async list => {
    try {
      setLoading({ ...loading, actionLoading: true })
      await updateList(list)
      dispatch({ type: "DELETE_MEMBER", payload: list })
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, actionLoading: false })
    }
  }

  const changeListStatus = async list => {
    try {
      setLoading({ ...loading, actionLoading: true })
      await updateList(list)
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, actionLoading: false })
    }
  }

  const removeList = async id => {
    try {
      setLoading({ ...loading, actionLoading: true })
      const accessToken = getAccessToken()

      const { message } = await checkTokenExpired(accessToken, id, deleteList)

      history.replace("/dashboard")
      dispatch({ type: "DELETE_LIST", message, id })
    } catch (error) {
      console.log(error)
      dispatch({ type: "FAILURE", payload: error.response?.data.message })
    } finally {
      setLoading({ ...loading, actionLoading: false })
    }
  }

  return (
    <ListContext.Provider
      value={{
        state,
        createNewList,
        removeList,
        removeMember,
        loading,
        addToList,
        socketUpdate,
        changeListStatus
      }}
    >
      {children}
    </ListContext.Provider>
  )
}

ListContextProvider.propTypes = {
  children: PropTypes.node
}

export default ListContextProvider
