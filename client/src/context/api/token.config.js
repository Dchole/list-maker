let accessToken = ""

/**
 * @param {string} token
 */
export const setAccessToken = token => {
  accessToken = token
}

export const getAccessToken = () => accessToken

/**
 * @param {string} token
 */
export const options = token => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }

  return config
}
