import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import withValidation from '../hoc/withValidation'

import { FieldInputError } from 'System/Typography'
import { types } from 'Services/Validation'
import Input, {
  Label, LabelConstraint,
} from 'System/Input'
import Button from 'System/Button'
import {
  FormWrapper, FormContainer, FormTitle, FormDesc, FormChangeLink,
} from 'Styled/LRForm'

@inject('userStore', 'authStore')
@observer
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onLogin = (e) => {
    e.preventDefault()
    const { authStore, userStore, assert } = this.props
    assert(types.LOGIN).then(() => {
      const { isLoginValid } = this.props
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
    const { from } = this.props.location.state || { from: { pathname: '/' } }
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
              isInvalid={errors.EMAIL}
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.EMAIL && <FieldInputError>{errors.EMAIL}</FieldInputError>}
            <Label>Password</Label>
            <Input
              placeholder="password"
              type="password"
              onBlur={() => assert(types.PASSWORD)}
              isInvalid={errors.PASSWORD}
              onChange={e => authStore.changePassword(e.target.value)} />
            {errors.PASSWORD && <FieldInputError>{errors.PASSWORD}</FieldInputError>}
            <Button
              appearance="default"
              intent="none"
              onClick={e => this.onLogin(e)}>
              Login
            </Button>
            <FormChangeLink
              to={{
                pathname: '/register',
                state: {
                  from,
                },
              }}>
              Don't have an account? <u>Sign Up</u>
            </FormChangeLink>
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
