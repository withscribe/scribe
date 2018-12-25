import { string, object, ref } from 'yup'

const invalidEmail = 'Email must be valid'
const noEmail = 'Email is required'

const noUsername = 'Username is required'
const shortUsername = 'Username must be at least 2 characters'

const noPassword = 'Password is required'
const shortPassword = 'Password must be at least 5 characters'

const passwordValidation = string()
  .min(5, shortPassword)
  .max(25)
  .required(noPassword)

const emailValidation = string()
  .email(invalidEmail)
  .required(noEmail)

const usernameValidation = string()
  .min(2, shortUsername)
  .max(12)
  .required(noUsername)

const loginSchema = object().shape({
  email: emailValidation,
  password: passwordValidation,
})

const registerSchema = object().shape({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: string()
    .oneOf([ref('password'), null], "Passwords don't match")
    .required('Password Confirmation is required'),
})

const passwordField = object().shape({
  password: passwordValidation,
})

const confirmPasswordField = object().shape({
  password: passwordValidation,
  confirmPassword: string()
    .oneOf([ref('password'), null], "Passwords don't match")
    .required('Password Confirmation is required'),
})

const usernameField = object().shape({
  username: usernameValidation,
})

const emailField = object().shape({
  email: emailValidation,
})


const types = {
  USERNAME: 'USERNAME',
  PASSWORD: 'PASSWORD',
  CONFIRM: 'CONFIRM',
  EMAIL: 'EMAIL',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
}

const validate = async (type, value) => {
  console.log(type)
  switch (type) {
  case types.USERNAME:
    return usernameField.validate({ username: value })
  case types.PASSWORD:
    return passwordField.validate({ password: value })
  case types.CONFIRM:
    return confirmPasswordField.validate({ ...value })
  case types.EMAIL:
    return emailField.validate({ email: value })
  case types.LOGIN:
    return loginSchema.validate({ ...value })
  case types.REGISTER:
    return registerSchema.validate({ ...value })
  default:
    return value
  }
}

export default validate

export { validate, types }
