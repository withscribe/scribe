const types = {
  CHECK_USERNAME: 'CHECK_USERNAME',
  CHECK_PASSWORD: 'CHECK_PASSWORD',
  CHECK_COPY: 'CHECK_COPY',
  CHECK_EMAIL: 'CHECK_EMAIL',
}

const checkUsername = (username) => {
  const report = {
    errors: [],
    isFieldValid: true,
  }
  if (username.length === 0) {
    report.isFieldValid = false
    report.errors = 'Username cannot be empty'
  }

  if (typeof username !== 'undefined' && report.errors.length === 0) {
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      report.isFieldValid = false
      report.errors = 'Username can only contain letters and numbers'
    }
  }

  // this.setState(prevState => ({ errors: { ...prevState.errors, username: errors } }))
  return report
}

const checkEmail = (email) => {
  const report = {
    errors: [],
    isFieldValid: true,
  }

  if (!email) {
    report.isFieldValid = false
    report.errors = 'Email cannot be empty'
  }
  if (typeof email !== 'undefined' && report.errors.length === 0) {
    const lastAtPos = email.lastIndexOf('@')
    const lastDotPos = email.lastIndexOf('.')

    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
      report.isFieldValid = false
      report.errors = 'Email is not valid'
    }
  }
  // this.setState(prevState => ({ errors: { ...prevState.errors, email: errors } }))
  return report
}

const checkPassword = (password) => {
  const report = {
    errors: [],
    isFieldValid: true,
  }

  if (password.length < 8 || password.length > 32) {
    report.isFieldValid = false
    report.errors = 'Password must be at between 8 and 32 characters long'
  }
  // this.setState(prevState => ({ errors: { ...prevState.errors, password: errors } }))
  return report
}

const checkCopy = (password, copy) => {
  const report = {
    errors: [],
    isFieldValid: true,
  }

  if (password !== copy) {
    report.isFieldValid = false
    report.errors = 'Passwords do not match'
  }
  // this.setState(prevState => ({ errors: { ...prevState.errors, copy: errors } }))
  return report
}

const validators = {
  checkUsername,
  checkEmail,
  checkPassword,
  checkCopy,
}


const validate = (validatorType, value) => {
  console.log(validatorType)
  console.log(value)
  switch (validatorType) {
  case types.CHECK_USERNAME:
    return validators.checkUsername(value.username)
  case types.CHECK_PASSWORD:
    return validators.checkPassword(value.password)
  case types.CHECK_COPY:
    return validators.checkCopy(value.password)
  case types.CHECK_EMAIL:
    return validators.checkEmail(value.confirmPassword)
  default:
    return value
  }
}

export default validate

export { validators, types }
