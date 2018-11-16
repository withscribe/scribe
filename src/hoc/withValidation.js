import React from 'react'
import { inject, observer } from 'mobx-react'

import { validate, types } from 'Services/Validation'

const withValidation = (WrappedComponent) => {
  @inject('authStore')
  @observer
  class HOC extends React.Component {
    state = {
      errors: {
        USERNAME: null,
        EMAIL: null,
        PASSWORD: null,
        CONFIRM: null,
      },
      isFormValid: true,
    }

    assert = async (type) => {
      const { authStore } = this.props
      switch (type) {
      case types.USERNAME:
        await validate(type, authStore.username)
          .then(() => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: null } }))
          })
          .catch((error) => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: error.message } }))
          })
        break
      case types.PASSWORD:
        await validate(type, authStore.password)
          .then(() => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: null } }))
          })
          .catch((error) => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: error.message } }))
          })
        break
      case types.CONFIRM: {
        const { authStore: { password, confirmPassword } } = this.props
        await validate(type, { password, confirmPassword })
          .then(() => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: null } }))
          })
          .catch((error) => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: error.message } }))
          })
        break
      }
      case types.EMAIL:
        await validate(type, authStore.email)
          .then(() => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: null } }))
          })
          .catch((error) => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: error.message } }))
          })
        break
      default:
        console.log('no valid type supplied')
      }
    }

    render() {
      const { props } = this
      const { isFormValid, errors } = this.state
      return (
        <WrappedComponent
          errors={errors}
          valid={isFormValid}
          assert={this.assert}
          {...props} />
      )
    }
  }
  return HOC
}

export default withValidation
