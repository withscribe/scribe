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
              onBlur={() => single('CHECK_USERNAME')}
              onChange={e => authStore.changeUsername(e.target.value)} />
            {errors.CHECK_USERNAME && <span style={{ color: 'red' }}>{errors.CHECK_USERNAME}</span>}
            <Input
              placeholder="email"
              type="email"
              onBlur={() => single('CHECK_EMAIL')}
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.CHECK_EMAIL && <span style={{ color: 'red' }}>{errors.CHECK_EMAIL}</span>}
            <Input
              placeholder="password"
              type="password"
              onBlur={() => single('CHECK_PASSWORD')}
              onChange={e => authStore.changePassword(e.target.value)} />
            {errors.CHECK_PASSWORD && <span style={{ color: 'red' }}>{errors.CHECK_PASSWORD}</span>}
            <Input
              placeholder="confirm password"
              type="password"
              onBlur={() => single('CHECK_COPY')}
              onChange={e => authStore.changeConfirmPassword(e.target.value)} />
            {errors.CHECK_COPY && <span style={{ color: 'red' }}>{errors.CHECK_COPY}</span>}
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
