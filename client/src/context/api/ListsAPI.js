import Axios from "axios"
import { api } from "./api-url"
import { options } from "./token.config"

/**
 * @param {string} token
 */
export const fetchLists = async token => {
  const res = await Axios.get(`${api.baseURL}/api/list/`, options(token))
  const { data } = res
  return data
}

/**
 * @param {string} id
 */
export const fetchList = async id => {
  const res = await Axios.get(`${api.baseURL}/api/list/${id}`)
  const { data } = res
  return data
}

/**
 * @param {string} token
 * @param {Record<string, any>} body
 */
export const createList = async (token, body) => {
  const res = await Axios.post(`${api.baseURL}/api/list/`, body, options(token))
  const { data } = res
  return data
}

export const updateList = async list => {
  const res = await Axios.put(`${api.baseURL}/api/list/${list._id}`, list)
  const { data } = res
  return data
}

/**
 * @param {string} token
 * @param {string} id
 */
export const deleteList = async (token, id) => {
  const res = await Axios.delete(
    `${api.baseURL}/api/list/${id}`,
    options(token)
  )
  const { data } = res
  return data
}
