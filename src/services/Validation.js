import { string, object, ref } from 'yup'

const loginSchema = object().shape({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
})

const registerSchema = object().shape({
  username: string().required('Username is required'),
  email: string().email().required('Email is required'),
  password: string().required('Password is required'),
  confirmPassword: string().oneOf([ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
})

const passwordField = object().shape({
  password: string().required('Password is required'),
})

const confirmPasswordField = object().shape({
  password: string().required('Password is required'),
  confirmPassword: string().oneOf([ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
})

const usernameField = object().shape({
  username: string().required('Username is required'),
})

const emailField = object().shape({
  email: string().email().required('Email is required'),
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
    console.log(value)
    return usernameField.validate({ username: value })
  case types.PASSWORD:
    return passwordField.validate({ password: value })
  case types.CONFIRM:
    return confirmPasswordField.validate({ ...value })
  case types.EMAIL:
    return emailField.validate({ email: value })
  case types.LOGIN:
    return loginSchema.validate({ value })
  case types.REGISTER:
    return registerSchema.validate({ value })
  default:
    return value
  }
}

export default validate

export { validate, types }
