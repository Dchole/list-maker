export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, user: action.payload }

    case "SET_TOKEN":
      return { ...state, token: action.payload, isAuthenticated: true }

    case "REGISTER_SUCCESSFUL":
    case "LOGIN_SUCCESSFUL":
      return { ...state, success: action.payload, error: {} }

    case "FAILURE":
      return { ...state, feedback: action.payload }

    default:
      return state
  }
}
