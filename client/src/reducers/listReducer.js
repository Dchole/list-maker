export const listReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LISTS":
      return { ...state, lists: action.payload };

    case "CREATE_LIST":
      return {
        ...state,
        lists: [action.payload.list, ...state.lists]
      };

    case "ADD_MEMBER":
    case "DELETE_MEMBER": {
      const updatedList = action.payload;

      const updatedLists = state.lists.map(list => {
        if (list._id === updatedList._id) {
          return updatedList;
        }
        return list;
      });

      return { ...state, lists: updatedLists };
    }

    case "DELETE_LIST": {
      const lists = state.lists.filter(list => list._id !== action.id);
      return { feedback: action.message, lists };
    }

    case "FAILURE":
      return { ...state, feedback: action.payload };

    default:
      return state;
  }
};
