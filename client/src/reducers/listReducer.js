export const listReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LISTS":
      return { ...state, lists: action.payload }

    case "CREATE_LIST":
      return {
        feedback: action.payload.message,
        lists: [...state.lists, action.payload.item]
      }

    case "DELETE_LIST": {
      const lists = state.lists.filter(list => list !== action.payload)
      return { ...state, lists }
    }
    case "FAILURE":
      return { ...state, feedback: action.payload }

    default:
      return state
  }
}
