import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Input from '_system/Input'
import { Button } from '_system/Button'
import { LoginWrapper, LoginContainer } from 'Styled/style.Login'

@inject('userStore', 'authStore')
@observer
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onLogin = () => {
    const { authStore, userStore } = this.props
    authStore.loginUser()
      .then((res) => {
        const { user } = res
        userStore.setMe(user)
      })
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
        <LoginContainer width={[1.1 / 3, 1 / 4]}>
          <Input
            placeholder="email"
            type="text"
            onChange={e => authStore.changeEmail(e.target.value)} />
          <Input
            placeholder="password"
            type="text"
            onChange={e => authStore.changePassword(e.target.value)} />
          <Button
            full
            height
            onClick={this.onLogin}>
            Login
          </Button>
          <Link to="/register">Don't have an account? <b>Sign Up</b></Link>
          { userStore.me &&
            <span>you are logged in</span>
          }
        </LoginContainer>
      </LoginWrapper>
    )
  }
}

export default Login
