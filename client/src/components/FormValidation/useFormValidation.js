import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"

const useFormValidation = (initialState, validate) => {
  const [registerValues, setRegisterValues] = useState(initialState)
  const [loginValues, setLoginValues] = useState(initialState)
  const [memberValues, setMemberValues] = useState(initialState)
  const [registerErrors, setRegisterErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState({})
  const [memberErrors, setMemberErrors] = useState({})

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

  const handleMemberInput = event => {
    setMemberValues({
      ...memberValues,
      [event.target.name]: event.target.value
    })
  }

  const handleRegisterSubmit = event => {
    event.preventDefault()
    const validationErrors = validate(registerValues)
    setRegisterErrors(validationErrors)
    const noErrors = Object.keys(registerErrors).length === 0
    if (noErrors) {
      registerUser(registerValues)
    }
  }

  const handleLoginSubmit = event => {
    event.preventDefault()
    const validationErrors = validate(loginValues)
    setLoginErrors(validationErrors)
    const noErrors = Object.keys(loginErrors).length === 0
    if (noErrors) {
      loginUser(loginValues)
    }
  }

  const validateMemberForm = () => {
    const validationErrors = validate(memberValues)
    setMemberErrors(validationErrors)
  }

  return {
    handleRegisterInput,
    handleLoginInput,
    handleMemberInput,
    handleLoginSubmit,
    handleRegisterSubmit,
    validateMemberForm,
    registerErrors,
    loginErrors,
    memberErrors,
    registerValues,
    loginValues
  }
}

export default useFormValidation
