import jwtDecode from "jwt-decode"
import { getRefreshToken } from "./UserAPI"
import { setAccessToken } from "./token.config"

/**
 *
 * @param {string} token
 * @param {Record<string, any>} option
 * @param {Function} cb
 * @returns
 */
export const checkTokenExpired = async (token, option, cb) => {
  try {
    // @ts-ignore
    const { exp } = jwtDecode(token)
    if (Date.now() >= exp * 1000) {
      const { accessToken } = await getRefreshToken()
      setAccessToken(accessToken)
      return await cb(accessToken, option)
    } else {
      return await cb(token, option)
    }
  } catch (err) {
    console.log(err)
  }
}
