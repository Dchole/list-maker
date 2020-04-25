export const itemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload]

    case "UPDATE_ITEM": {
      const updatedItem = action.payload

      const updatedItems = state.map(item => {
        if (item.id === updatedItem.id) {
          return updatedItem
        }
        return item
      })

      return updatedItems
    }

    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.payload)

    default:
      return state
  }
}
