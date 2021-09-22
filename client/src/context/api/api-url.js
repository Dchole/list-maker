export const api = {
  baseURL:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "production"
      ? "http://localhost:5000"
      : "http://localhost:5000"
}

// ? "https://list-makerr.herokuapp.com"
