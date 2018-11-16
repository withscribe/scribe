import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import withValidation from '../hoc/withValidation'
import { validate, types } from 'Services/Validation'
import Input, { Label } from '_system/Input'
import { Button } from '_system/Button'
import {
  FormWrapper, FormContainer, FormTitle, FormDesc,
} from 'Styled/LRForm'

@inject('userStore', 'authStore')
@observer
class Register extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onRegister = (e) => {
    e.preventDefault()
    // const canRegister = this.props.validate()
    // if (canRegister) {
      const { authStore } = this.props
      authStore.registerUser()
    // }
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
              name="username"
              // onBlur={this.onBlur}
              onBlur={() => assert(types.USERNAME)}
              onChange={e => authStore.changeUsername(e.target.value)} />
            {errors.USERNAME && <span style={{ color: 'red' }}>{errors.USERNAME}</span>}
            <Label>Email</Label>
            <Input
              placeholder="email"
              type="email"
              // onBlur={() => try('EMAIL')}
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.EMAIL && <span style={{ color: 'red' }}>{errors.EMAIL}</span>}
            <Label>Password</Label>
            <Input
              placeholder="password"
              type="password"
              // onBlur={() => try('PASSWORD')}
              onChange={e => authStore.changePassword(e.target.value)} />
            {errors.PASSWORD && <span style={{ color: 'red' }}>{errors.PASSWORD}</span>}
            <Label>Confirm Password</Label>
            <Input
              placeholder="confirm password"
              type="password"
              // onBlur={() => single('COPY')}
              onChange={e => authStore.changeConfirmPassword(e.target.value)} />
            {errors.COPY && <span style={{ color: 'red' }}>{errors.COPY}</span>}
            <Button
              type="submit"
              disabled={valid === false}
              onClick={e => this.onRegister(e)}>
              Register
            </Button>
            <Link to="/login">Already have an account? <u>Log in.</u></Link>
          </form>
        </FormContainer>
      </FormWrapper>
    )
  }
}

export default withValidation(Register)
