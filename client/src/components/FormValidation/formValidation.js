/**
 * @param {string} title
 */
export const adminValidation = title => {
  let error = ""

  if (!title) {
    error = "Title is required"
  }
  return error
}

/**
 * @param {Record<string, any>} form
 * @param {string} firstName
 * @param {string} lastName
 */
export const memberValidation = (form, firstName, lastName) => {
  let errors = {}

  const values = Object.keys(form)

  if (!firstName) {
    errors.firstName = "First Name is required"
  }

  if (!lastName) {
    errors.lastName = "Last Name is required"
  }

  for (const value of values) {
    if (!form[value]) {
      errors[value] = `${value} is Required`
    }
  }

  return errors
}
