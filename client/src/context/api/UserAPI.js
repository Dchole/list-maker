import Axios from "axios";
import { options } from "./util";

export const fetchUser = async token => {
  const res = await Axios.get("/api/user/", options(token));
  const data = { res };
  return data;
};

export const register = async credentials => {
  const res = await Axios.post("/api/user/register", credentials);
  const data = { res };
  return data;
};

export const login = async credentials => {
  const res = await Axios.post("/api/user/login", credentials);
  const data = { res };
  return data;
};

export const getRefreshToken = async () => {
  const res = await Axios.post("/api/user/token", { withCredentials: true });
  const data = { res };
  return data;
};

export const updateUser = async (token, credentials) => {
  const res = await Axios.put("/api/user/", credentials, options(token));
  const data = { res };
  return data;
};

export const logout = async () => {
  const res = await Axios.post("/api/user/logout", { withCredentials: true });
  const data = { res };
  return data;
};
