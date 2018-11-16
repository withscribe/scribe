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

      },
      isFormValid: true,
    }

    assert = async (type) => {
      const { authStore } = this.props
      switch (type) {
      case types.USERNAME: {
        const res = await validate(type, authStore.username)
          .then(() => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: null } }))
          })
          .catch((error) => {
            this.setState(prevState => (
              { errors: { ...prevState.errors, [type]: error.message } }))
          })
        return res
      }
      case types.PASSOWORD:
        return validate(type, authStore.password)
      case types.CONFIRM:
        return validate(type, authStore.confirmPassword)
      case types.EMAIL:
        return validate(type, authStore.email)
      default:
        return 'no valid type supplied'
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
