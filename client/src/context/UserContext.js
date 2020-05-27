import React, { createContext, useEffect, useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import {
  getRefreshToken,
  fetchUser,
  login,
  register,
  logout
} from "./api/UserAPI";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const initialState = {
    token: null,
    isAuthenticated: false,
    user: {},
    feedback: {}
  };

  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState({
    userLoading: true,
    authLoading: false
  });

  const registerUser = async credentials => {
    try {
      setLoading({ ...loading, authLoading: true });

      const { message } = await register(credentials);
      dispatch({ type: "REGISTER_SUCCESSFUL", payload: message });
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    } finally {
      setLoading({ ...loading, authLoading: false });
    }
  };

  const loginUser = async credentials => {
    try {
      setLoading({ ...loading, authLoading: true });

      const { accessToken, message } = await login(credentials);
      const { user } = await fetchUser(accessToken);

      dispatch({ type: "LOGIN_SUCCESSFUL", payload: message });
      dispatch({ type: "SET_TOKEN", payload: accessToken });
      dispatch({ type: "FETCH_USER", payload: user });

      history.replace("/");
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    } finally {
      setLoading({ ...loading, authLoading: false });
    }
  };

  const exitApp = async () => {
    try {
      setLoading({ ...loading, authLoading: true });

      const { message } = await logout();
      dispatch({ type: "LOGOUT", payload: message });

      state.isAuthenticated = false;
      history.replace("/login");
    } catch (error) {
      dispatch({ type: "FAILURE", payload: error.response.data.message });
    } finally {
      setLoading({ ...loading, authLoading: false });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(l => ({ ...l, userLoading: true }));

        const { accessToken } = await getRefreshToken();
        const { user } = await fetchUser(accessToken);

        dispatch({ type: "SET_TOKEN", payload: accessToken });
        dispatch({ type: "FETCH_USER", payload: user });
      } catch (error) {
        dispatch({ type: "FAILURE", payload: error.response.data.message });
      } finally {
        setLoading(l => ({ ...l, userLoading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    dispatch({ type: "DEFAULT", payload: {} });
  }, [history.location.pathname]);

  return (
    <UserContext.Provider
      value={{ state, registerUser, loginUser, loading, exitApp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
