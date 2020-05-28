import jwtDecode from "jwt-decode";
import { getRefreshToken } from "./UserAPI";
import { setAccessToken } from "./token.config";

export const checkTokenExpired = async token => {
  const { exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    const { accessToken } = await getRefreshToken();
    setAccessToken(accessToken);
    return accessToken;
  }
};
