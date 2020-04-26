import React, { useState, useContext } from "react"
import { TextField } from "@material-ui/core"
import { ItemContext } from "../context/ItemContext"

const MemberForm = () => {
  const { dispatch } = useContext(ItemContext)
  const [item, setItem] = useState({
    id: Math.random(),
    fullName: "",
    content: "",
    date: Date().getMinutes()
  })

  const handleSubmit = event => {
    event.preventDefault()
    dispatch({ type: "ADD_POST", payload: item })
  }

  const handleChange = event => {
    setItem({ ...item, [event.target.name]: event.target.value })
  }

  return (
    <form action="/" onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        onChange={handleChange}
        value={item.fullName}
        fullWidth
      />
      <TextField
        variant="outlined"
        onChange={handleChange}
        value={item.content}
        fullWidth
      />
    </form>
  )
}

export default Form
