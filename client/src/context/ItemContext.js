/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from "react"
import Proptypes from "prop-types"
import { itemReducer } from "../reducers/itemReducer"

export const ItemContext = createContext()

const ItemContextProvider = ({ children }) => {
  const initialState = [
    {
      id: Math.random(),
      content: "Some post content",
      fullName: "John Doe",
      date: new Date().getMinutes()
    }
  ]

  const [state, dispatch] = useReducer(itemReducer, initialState)

  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  )
}

ItemContextProvider.prototype = {
  children: Proptypes.node
}

export default ItemContextProvider
