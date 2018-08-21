import React from 'react'

const withValidation = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      errors: {},
      isFormValid: true,
    }

    validate = (username, email, password) => {
      const isUsernameValid = this.checkUsername(username)
      const isEmailValid = this.checkEmail(email)

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

      this.setState(prevState => ({ errors: { ...prevState.errors, username: errors } } ))
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
      this.setState(prevState => ({ errors: { ...prevState.errors, email: errors } } ))
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
          {...props} />
      )
    }
  }
  return HOC
}

export default withValidation
