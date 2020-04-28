import Axios from "axios"

const options = token => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  }

  return config
}

export const fetchUser = async token => {
  try {
    const res = await Axios.get("/api/user/", options(token))
    const data = { res }
    return data
  } catch (err) {
    return err.response
  }
}

export const register = async credentials => {
  try {
    const body = JSON.stringify(credentials)
    const res = await Axios.post("/api/user/register", body)
    const data = { res }
    return data
  } catch (err) {
    return err.response
  }
}

export const login = async credentials => {
  try {
    const body = JSON.stringify(credentials)
    const res = await Axios.post("/api/user/login", body)
    const data = { res }
    return data
  } catch (err) {
    return err.response
  }
}

export const getRefreshToken = async () => {
  try {
    const res = await Axios.get("/api/user/token", { withCredentials: true })
    const data = { res }
    return data
  } catch (err) {
    return err.response
  }
}

export const updateUser = async (token, credentials) => {
  try {
    const body = JSON.stringify(credentials)
    const res = await Axios.put("/api/user/", body, options(token))
    const data = { res }
    return data
  } catch (err) {
    return err.response
  }
}

export const logout = async () => {
  try {
    const res = await Axios.post("/api/user/login", { withCredentials: true })
    const data = { res }
    return data
  } catch (err) {
    return err.response
  }
}
