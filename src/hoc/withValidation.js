import React from 'react'
import { inject, observer } from 'mobx-react'

const withValidation = (WrappedComponent) => {
  @inject('authStore')
  @observer
  class HOC extends React.Component {
    state = {
      errors: {},
      isFormValid: true,
    }

    singleValidation = (type) => {
      if (type === 'username') {
        this.checkUsername(this.props.authStore.username)
      }
      if (type === 'email') {
        this.checkEmail(this.props.authStore.email)
      }
      if (type === 'password') {
        this.checkPassword(this.props.authStore.password)
      }
      if (type === 'copy') {
        this.checkCopy(this.props.authStore.password, this.props.authStore.confirmPassword)
      }
    }

    validate = () => {
      const {
        authStore: {
          username, email, password, confirmPassword,
        },
      } = this.props
      let isUsernameValid = false
      let isEmailValid = false
      let isPasswordValid = false

      if (username) { isUsernameValid = this.checkUsername(username) }
      if (email) { isEmailValid = this.checkEmail(email) }

      if (isUsernameValid && isEmailValid) {
        this.setState({ isFormValid: true })
        return true
      }
      return false
    }

    checkUsername = (username) => {
      let errors = []
      let isFieldValid = true
      if (username.length === 0) {
        isFieldValid = false
        errors = 'Username cannot be empty'
      }

      if (typeof username !== 'undefined' && errors.length === 0) {
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
          isFieldValid = false
          errors = 'Username can only contain letters and numbers'
        }
      }

      this.setState(prevState => ({ errors: { ...prevState.errors, username: errors } }))
      return isFieldValid
    }

    checkEmail = (email) => {
      let errors = []
      let isFieldValid = true

      if (!email) {
        isFieldValid = false
        errors = 'Email cannot be empty'
      }
      if (typeof email !== 'undefined' && errors.length === 0) {
        const lastAtPos = email.lastIndexOf('@')
        const lastDotPos = email.lastIndexOf('.')

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
          isFieldValid = false
          errors = 'Email is not valid'
        }
      }
      this.setState(prevState => ({ errors: { ...prevState.errors, email: errors } }))
      return isFieldValid
    }

    checkPassword = (password) => {
      let errors = []
      let isFieldValid = true

      if (password.length < 8 || password.length > 32) {
        isFieldValid = false
        errors = 'Password must be at between 8 and 32 characters long'
      }
      this.setState(prevState => ({ errors: { ...prevState.errors, password: errors } }))
      return isFieldValid
    }

    checkCopy = (password, copy) => {
      let errors = []
      let isFieldValid = true

      if (password !== copy) {
        isFieldValid = false
        errors = 'Passwords do not match'
      }
      this.setState(prevState => ({ errors: { ...prevState.errors, copy: errors } }))
      return isFieldValid
    }

    render() {
      const { props } = this
      const { isFormValid, errors } = this.state
      console.log(errors)
      return (
        <WrappedComponent
          errors={errors}
          valid={isFormValid}
          validate={this.validate}
          single={this.singleValidation}
          {...props} />
      )
    }
  }
  return HOC
}

export default withValidation
