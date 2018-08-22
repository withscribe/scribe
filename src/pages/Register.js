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

  onRegister = (e) => {
    e.preventDefault()
    const canRegister = this.props.validate()
    if (canRegister) {
      const { authStore } = this.props
      authStore.registerUser()
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { authStore, errors, valid, validate, single } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <FormWrapper>
        <FormContainer width={[1.1 / 3, 1 / 4]}>
          <form>
            <Input
              placeholder="username"
              type="text"
              onBlur={() => single('username')}
              onChange={e => authStore.changeUsername(e.target.value)} />
            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            <Input
              placeholder="email"
              type="email"
              onBlur={() => single('email')}
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <Input
              placeholder="password"
              type="password"
              onBlur={() => single('password')}
              onChange={e => authStore.changePassword(e.target.value)} />
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            <Input
              placeholder="confirm password"
              type="password"
              onBlur={() => single('copy')}
              onChange={e => authStore.changeConfirmPassword(e.target.value)} />
            {errors.copy && <span style={{ color: 'red' }}>{errors.copy}</span>}
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
