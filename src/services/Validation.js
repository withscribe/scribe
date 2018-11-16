import * as yup from 'yup'

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required'),
})

const usernameField = yup.object().shape({
  username: yup.string().required('Username is required'),
})

const emailField = yup.object().shape({
  email: yup.string().email().required('Email is required'),
})


const types = {
  USERNAME: 'USERNAME',
  PASSOWORD: 'PASSOWORD',
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
  // case types.PASSOWORD:
  //   return password.checkPassword(value.password)
  // case types.COPY:
  //   return validators.checkCopy(value.password)
  case types.EMAIL:
    return emailField.isValid(value)
  case types.LOGIN:
    return loginSchema.isValid(value)
  case types.REGISTER:
    return registerSchema.isValid(value)
  default:
    return value
  }
}

export default validate

export { validate, types }
