import React from 'react'
import { inject, observer } from 'mobx-react'
import validate from '../services/Validation'

const withValidation = (WrappedComponent) => {
  @inject('authStore')
  @observer
  class HOC extends React.Component {
    state = {
      errors: {},
      isFormValid: true,
    }

    singleValidation = (type) => {
      const { authStore } = this.props
      const res = validate(type, authStore)
      this.setState(prevState => ({ errors: { ...prevState.errors, [type]: res.errors } }))
    }

    validate = () => {
      const {
        authStore: {
          username, email, password, confirmPassword,
        },
      } = this.props

      return false
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
