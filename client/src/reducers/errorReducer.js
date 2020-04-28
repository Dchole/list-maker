export const errorReducer = (state, action) => {
  switch (action.type) {
    case "FAILURE":
      return {
        ...state,
        errorMsg: action.payload.message,
        errorPath: action.payload.path
      }

    default:
      return state
  }
}
