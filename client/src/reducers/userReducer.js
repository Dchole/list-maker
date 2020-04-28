export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, user: action.payload }

    case "REFRESH_TOKEN":
      return { ...state, token: action.payload }

    default:
      return state
  }
}
