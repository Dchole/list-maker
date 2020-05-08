export const listReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LISTS":
      return { ...state, lists: action.payload }

    case "CREATE_LIST":
      return {
        ...state,
        lists: [...state.lists, action.payload.list]
      }

    case "ADD_MEMBER":
      return state.lists.map(list => list.members.push(list))

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
