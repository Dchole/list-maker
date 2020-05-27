import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext
} from "react";
import { listReducer } from "../reducers/listReducer";
import { fetchLists, createList, deleteList, updateList } from "./api/ListsAPI";
import { getRefreshToken } from "./api/UserAPI";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export const ListContext = createContext();

const ListContextProvider = ({ children }) => {
  const history = useHistory();
  const initialState = { feedback: null, lists: [] };

  const [state, dispatch] = useReducer(listReducer, initialState);

  const {
    state: { isAuthenticated }
  } = useContext(UserContext);

  const [loading, setLoading] = useState({
    listLoading: true,
    actionLoading: false
  });

  useEffect(() => {
    (async () => {
      if (state.lists.length === 0) {
        try {
          setLoading(l => ({ ...l, listLoading: true }));
          const { res } = await getRefreshToken();
          const { lists } = await fetchLists(res.data.accessToken);
          dispatch({ type: "FETCH_LISTS", payload: lists });
        } catch (error) {
          dispatch({ type: "FAILURE", payload: error.response });
        } finally {
          setLoading(l => ({ ...l, listLoading: false }));
        }
      }
    })();
  }, [state.lists.length, isAuthenticated]);

  const createNewList = async body => {
    try {
      setLoading({ ...loading, actionLoading: true });
      const { res } = await getRefreshToken();
      const { savedList } = await createList(res.data.accessToken, body);
      dispatch({ type: "CREATE_LIST", payload: { list: savedList } });

      const route = `/lists/${savedList._id}`;
      history.push(route);
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const addToList = async list => {
    try {
      setLoading({ ...loading, actionLoading: true });
      await updateList(list);
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const socketUpdate = list => dispatch({ type: "ADD_MEMBER", payload: list });

  const removeMember = async list => {
    try {
      setLoading({ ...loading, actionLoading: true });
      await updateList(list);
      dispatch({ type: "DELETE_MEMBER", payload: list });
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const changeListStatus = async list => {
    try {
      setLoading({ ...loading, actionLoading: true });
      await updateList(list);
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const removeList = async id => {
    try {
      setLoading({ ...loading, actionLoading: true });
      const { res } = await getRefreshToken();
      const { message } = await deleteList(res.data.accessToken, id);
      history.replace("/dashboard");
      dispatch({ type: "DELETE_LIST", message, id });
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

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
  );
};

export default ListContextProvider;
