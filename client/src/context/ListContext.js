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
import { getAccessToken, setAccessToken } from "./api/token.config";
import { checkTokenExpired } from "./api/checkTokenExpired";

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

          const { accessToken } = await getRefreshToken();
          const { lists } = await fetchLists(accessToken);

          dispatch({ type: "FETCH_LISTS", payload: lists });
        } catch (error) {
          dispatch({ type: "FAILURE", payload: error.response.data.message });
        } finally {
          setLoading(l => ({ ...l, listLoading: false }));
        }
      }
    })();
  }, [state.lists.length, isAuthenticated]);

  const createNewList = async body => {
    try {
      setLoading({ ...loading, actionLoading: true });
      const accessToken = getAccessToken();

      const newToken = await checkTokenExpired(accessToken);
      let list;

      if (newToken) {
        const { savedList } = await createList(newToken, body);
        setAccessToken(newToken);
        list = savedList;
      } else {
        const { savedList } = await createList(accessToken, body);
        list = savedList;
      }

      dispatch({ type: "CREATE_LIST", payload: { list } });

      const route = `/lists/${list._id}`;
      history.push(route);
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const addToList = async list => {
    try {
      setLoading({ ...loading, actionLoading: true });
      await updateList(list);
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response.data.message });
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
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const changeListStatus = async list => {
    try {
      setLoading({ ...loading, actionLoading: true });
      await updateList(list);
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    } finally {
      setLoading({ ...loading, actionLoading: false });
    }
  };

  const removeList = async id => {
    try {
      setLoading({ ...loading, actionLoading: true });
      const accessToken = getAccessToken();

      const newToken = await checkTokenExpired(accessToken);
      let successFeedback;

      if (newToken) {
        const { message } = await deleteList(newToken, id);
        successFeedback = message;
        setAccessToken(newToken);
      } else {
        const { message } = await deleteList(accessToken, id);
        successFeedback = message;
      }

      history.replace("/dashboard");
      dispatch({ type: "DELETE_LIST", message: successFeedback, id });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FAILURE", payload: error.response?.data.message });
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
