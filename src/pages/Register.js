import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Input from '_system/Input'
import { Button } from '_system/Button'
import { LoginWrapper, LoginContainer } from 'Styled/style.Login'

@inject('userStore', 'authStore')
@observer
class Register extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onRegister = () => {
    const { authStore } = this.props
    authStore.registerUser()
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { authStore, userStore } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <LoginWrapper>
        <LoginContainer>
          <Input
            placeholder="email"
            type="text"
            onChange={e => authStore.changeEmail(e.target.value)} />
          <Input
            placeholder="password"
            type="text"
            onChange={e => authStore.changePassword(e.target.value)} />
          <Input
            placeholder="confirm password"
            type="text"
            onChange={e => authStore.changePassword(e.target.value)} />
          <Button
            full
            height
            onClick={this.onRegister}>
            Register Account
          </Button>
          <Link to="/login">Already have an account? Log in.</Link>
          { userStore.me &&
            <span>you are logged in</span>
          }
        </LoginContainer>
      </LoginWrapper>
    )
  }
}

export default Register
