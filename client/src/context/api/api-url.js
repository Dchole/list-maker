export const api = {
  baseURL:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
      ? "https://list-makerr.herokuapp.com"
      : "http://localhost:5000"
}
