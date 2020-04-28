export const authReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
    case "LOGIN_USER":
      return { success: action.payload, errorMsg: "", errorPath: "" }

    default:
      return state
  }
}
