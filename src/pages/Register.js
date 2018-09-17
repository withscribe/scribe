import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import withValidation from '../hoc/withValidation'

import Input from '_system/Input'
import { Button } from '_system/Button'
import { FormWrapper, FormContainer, FormTitle } from 'Styled/LRForm'

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
              onBlur={() => single('USERNAME')}
              onChange={e => authStore.changeUsername(e.target.value)} />
            {errors.USERNAME && <span style={{ color: 'red' }}>{errors.USERNAME}</span>}
            <Input
              placeholder="email"
              type="email"
              onBlur={() => single('EMAIL')}
              onChange={e => authStore.changeEmail(e.target.value)} />
            {errors.EMAIL && <span style={{ color: 'red' }}>{errors.EMAIL}</span>}
            <Input
              placeholder="password"
              type="password"
              onBlur={() => single('PASSWORD')}
              onChange={e => authStore.changePassword(e.target.value)} />
            {errors.PASSWORD && <span style={{ color: 'red' }}>{errors.PASSWORD}</span>}
            <Input
              placeholder="confirm password"
              type="password"
              onBlur={() => single('COPY')}
              onChange={e => authStore.changeConfirmPassword(e.target.value)} />
            {errors.COPY && <span style={{ color: 'red' }}>{errors.COPY}</span>}
            <Button
              type="submit"
              disabled={valid === false}
              full
              withHeight
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
