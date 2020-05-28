export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, user: action.payload, feedback: {} };

    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload,
        feedback: {}
      };

    case "REGISTER_SUCCESSFUL":
    case "LOGIN_SUCCESSFUL":
      return { ...state, feedback: { success: action.payload } };

    case "FAILURE":
      return { ...state, feedback: { error: action.payload } };

    case "DEFAULT":
      return { ...state, feedback: action.payload };

    default:
      return state;
  }
};
