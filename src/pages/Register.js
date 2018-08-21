import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import withValidation from '../hoc/withValidation'

import Input from '_system/Input'
import { Button } from '_system/Button'
import { FormWrapper, FormContainer, FormTitle } from 'Styled/style.LRForm'

@inject('userStore', 'authStore')
@observer
class Register extends React.Component {
  state = {
    redirectToReferrer: false,
  }

//   handleValidation = () => {
//     const { authStore: { username, email } } = this.props
//     const errors = {}
//     let isFormValid = true
//
//     if (!username) {
//       isFormValid = false
//       errors.username = 'Username cannot be empty'
//     }
//     if (typeof username !== 'undefined') {
//       if (!username.match(/^[a-zA-Z0-9]+$/)) {
//         isFormValid = false
//         errors.username = 'Username can only contain letters and numbers'
//       }
//     }
//
//     if (!email) {
//       isFormValid = false
//       errors.email = 'Email cannot be empty'
//     }
//     if (typeof email !== 'undefined') {
//       const lastAtPos = email.lastIndexOf('@')
//       const lastDotPos = email.lastIndexOf('.')
//
//       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
//         isFormValid = false
//         errors.email = 'Email is not valid'
//       }
//     }
//
//     this.setState({ errors, isFormValid })
//     return isFormValid
//   }

  onRegister = (e) => {
    e.preventDefault()
    const { authStore: { username, email } } = this.props
    const canRegister = this.props.validate(username, email)
    console.log(canRegister)
    if (canRegister) {
      const { authStore } = this.props
      authStore.registerUser()
    }
  }

  refreshValidation = () => {
    const { authStore: { username, email } } = this.props
    const canRegister = this.props.validate(username, email)
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { authStore, errors, valid, validate } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <FormWrapper>
        <FormContainer width={[1.1 / 3, 1 / 4]}>
          <form
            onBlur={this.refreshValidation}>
            <Input
              placeholder="username"
              type="text"
              onChange={e => authStore.changeUsername(e.target.value)} />
            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            <Input
              placeholder="email"
              type="text"
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <Input
              placeholder="password"
              type="text"
              onChange={e => authStore.changePassword(e.target.value)} />
            <Input
              placeholder="confirm password"
              type="text"
              onChange={e => authStore.changePassword(e.target.value)} />
            <Button
              type="submit"
              disabled={valid === false}
              full
              height
              onClick={e => this.onRegister(e)}>
              Register Account
            </Button>
            <Link to="/login">Already have an account? Log in.</Link>
          </form>
        </FormContainer>
      </FormWrapper>
    )
  }
}

export default withValidation(Register)
