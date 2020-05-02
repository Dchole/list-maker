import Axios from "axios"
import { options } from "./util"

export const fetchLists = async token => {
  const res = await Axios.get("/api/list/", options(token))
  const { data } = res
  return data
}

export const createList = async (token, body) => {
  const res = await Axios.post("/api/list/", body, options(token))
  const { data } = res
  return data
}

export const updateList = async list => {
  const res = await Axios.put(`/api/list/${list._id}`, list)
  const { data } = res
  return data
}

export const deleteList = async (token, id) => {
  const res = await Axios.delete(`/api/list/${id}`, options(token))
  const { data } = res
  return data
}
