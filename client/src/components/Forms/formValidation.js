export const adminValidation = values => {
  let errors = {}

  if (!values.title) {
    errors.title = "Title is required"
  }
  return errors
}

export const memberValidation = (form, firstname, lastname) => {
  let errors = {}

  const values = Object.keys(form)

  if (!firstname) {
    errors.firstname = "First Name is required"
  }

  if (!lastname) {
    errors.lastname = "Last Name is required"
  }

  for (const value of values) {
    if (!form[value]) {
      errors[value] = `${value} is Required`
    }
  }

  return errors
}
