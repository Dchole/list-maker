import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const { registerUser } = useContext(UserContext)

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0
    if (noErrors) {
      //   registerUser(values)
    }
    console.log(errors)
  }, [errors])

  const handleInput = event => {
    setValues({ ...values, [event.target.name]: event.target.value })
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  const handleBlur = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    registerUser(values)
  }

  return { handleInput, handleBlur, handleSubmit, errors, values }
}

export default useFormValidation
