import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import withValidation from '../hoc/withValidation'

import { types } from 'Services/Validation'
import Input, {
  Label, LabelConstraint,
} from '_system/Input'
import { Button, ButtonPrimary } from '_system/Button'
import {
  FormWrapper, FormContainer, FormTitle, FormDesc,
} from 'Styled/LRForm'

@inject('userStore', 'authStore')
@observer
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onLogin = (e) => {
    e.preventDefault()
    const { authStore, userStore, assert, isLoginValid } = this.props
    assert(types.LOGIN).then(() => {
      if (isLoginValid) {
        authStore.loginUser()
          .then((res) => {
            const { account } = res
            userStore.pullMeById(account.id)
            this.setState({ redirectToReferrer: true })
          })
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { authStore, errors, assert } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <FormWrapper>
        <FormContainer width={[1 / 2, 1 / 2]}>
          <FormTitle>Welcome back!</FormTitle>
          <FormDesc>Login to continue with Scribe.</FormDesc>
        </FormContainer>
        <FormContainer width={[1 / 2, 1 / 3]} ml="auto" mt="10em">
          <form>
            <Label>Email</Label>
            <Input
              placeholder="email"
              type="text"
              onBlur={() => assert(types.EMAIL)}
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.EMAIL && <span style={{ color: 'red' }}>{errors.EMAIL}</span>}
            <Label>Password</Label>
            <Input
              placeholder="password"
              type="text"
              onBlur={() => assert(types.PASSWORD)}
              onChange={e => authStore.changePassword(e.target.value)} />
            {errors.PASSWORD && <span style={{ color: 'red' }}>{errors.PASSWORD}</span>}
            <ButtonPrimary
              onClick={e => this.onLogin(e)}>
              Login
            </ButtonPrimary>
            <Link to="/register">Don't have an account? <u>Sign Up</u></Link>
          </form>
        </FormContainer>
      </FormWrapper>
    )
  }
}

Login.propTypes = {
  userStore: PropTypes.shape({}),
  authStore: PropTypes.shape({}),
}

export default withValidation(Login)
