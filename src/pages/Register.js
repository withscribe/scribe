import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import withValidation from '../hoc/withValidation'

import { FieldInputError } from 'System/Typography'
import { types } from 'Services/Validation'
import Input, { Label } from 'System/Input'
import Button from 'System/Button'
import {
  FormWrapper, FormContainer, FormTitle, FormDesc, FormChangeLink,
} from 'Styled/LRForm'

@inject('userStore', 'authStore')
@observer
class Register extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onRegister = (e) => {
    e.preventDefault()
    const { assert, authStore, userStore } = this.props
    assert(types.REGISTER).then(() => {
      const { isFormValid } = this.props
      if (isFormValid) {
        authStore.registerUser()
          .then(() => {
            authStore.loginUser()
              .then((res) => {
                const { account } = res
                userStore.pullMeById(account.id)
                this.setState({ redirectToReferrer: true })
              })
          })
      }
    })
  }

  // this may be used for more logic in the future to replace
  // onBlur={() => assert(types.USERNAME)}
  onBlur = () => { }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { authStore, errors, valid, assert } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <FormWrapper>
        <FormContainer width={1 / 2}>
          <FormTitle>Join the open writing community.</FormTitle>
          <FormDesc>
            With a Scribe account, you can create your own stories, expand your personal library,
            and contribute to stories you love!
          </FormDesc>
        </FormContainer>
        <FormContainer width={1 / 3} ml="auto" mt="10em">
          <form>
            <Label>Username</Label>
            <Input
              placeholder="username"
              type="text"
              onBlur={() => assert(types.USERNAME)}
              isInvalid={errors.USERNAME}
              onChange={e => authStore.changeUsername(e.target.value)} />
            {errors.USERNAME && <FieldInputError>{errors.USERNAME}</FieldInputError>}
            <Label>Email</Label>
            <Input
              placeholder="email"
              type="email"
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
            <Label>Confirm Password</Label>
            <Input
              placeholder="confirm password"
              type="password"
              onBlur={() => assert(types.CONFIRM)}
              isInvalid={errors.CONFIRM}
              onChange={e => authStore.changeConfirmPassword(e.target.value)} />
            {errors.CONFIRM && <FieldInputError>{errors.CONFIRM}</FieldInputError>}
            <Button
              appearance="primary"
              intent="none"
              type="submit"
              disabled={valid === false}
              onClick={e => this.onRegister(e)}>
              Register
            </Button>
            <FormChangeLink
              to={{
                pathname: '/login',
                state: {
                  from,
                },
              }}>
              Already have an account? <u>Log in.</u>
            </FormChangeLink>
          </form>
        </FormContainer>
      </FormWrapper>
    )
  }
}

export default withValidation(Register)
