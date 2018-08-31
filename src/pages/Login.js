import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import Input from '_system/Input'
import { Button } from '_system/Button'
import { FormWrapper, FormContainer, FormTitle } from 'Styled/style.LRForm'

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
        const { account } = res
        userStore.setMe(account)
        this.setState({ redirectToReferrer: true })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { authStore } = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <FormWrapper>
        <FormContainer width={[1.1 / 3, 1 / 4]}>
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
        </FormContainer>
      </FormWrapper>
    )
  }
}

Login.propTypes = {
  userStore: PropTypes.shape({}),
  authStore: PropTypes.shape({}),
}

export default Login
