import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"

const useFormValidation = (initialState, validate) => {
  const [registerValues, setRegisterValues] = useState(initialState)
  const [loginValues, setLoginValues] = useState(initialState)
  const [registerErrors, setRegisterErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState({})

  const { registerUser, loginUser } = useContext(UserContext)

  const handleRegisterInput = event => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value
    })
  }

  const handleLoginInput = event => {
    setLoginValues({
      ...loginValues,
      [event.target.name]: event.target.value
    })
  }

  const handleRegisterSubmit = event => {
    event.preventDefault()
    const noErrors = Object.keys(registerErrors).length === 0
    if (noErrors) {
      registerUser(registerValues)
      setRegisterValues(initialState)
    }
  }

  const validateRegister = () => {
    console.log(registerValues)
    const validationErrors = validate(registerValues)
    setRegisterErrors(validationErrors)
  }

  const handleLoginSubmit = event => {
    event.preventDefault()
    const noErrors = Object.keys(loginErrors).length === 0
    if (noErrors) {
      loginUser(loginValues)
      setLoginValues(initialState)
    }
  }

  const validateLogin = () => {
    const validationErrors = validate(loginValues)
    setLoginErrors(validationErrors)
  }

  return {
    handleRegisterInput,
    handleLoginInput,
    handleLoginSubmit,
    handleRegisterSubmit,
    validateRegister,
    validateLogin,
    registerErrors,
    loginErrors,
    registerValues,
    loginValues
  }
}

export default useFormValidation
