import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('user', 'auth')
@observer
class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  onRegister = () => {
    const { auth } = this.props
    auth.registerUser()
  }

  onLogin = () => {
    const { auth } = this.props
    auth.loginUser()
  }

  onQuery = () => {
    const { user } = this.props
    user.fetchAllUsers()
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/start' } }
    const { redirectToReferrer } = this.state
    const { auth, user} = this.props

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <>
      <button
        type="submit"
        onClick={this.onRegister}>
        register
      </button>
      <button
        type="submit"
        onClick={this.onLogin}>
        test login
      </button>
      <button
        type="submit"
        onClick={this.onQuery}>
        test query
      </button>
      <input
        placeholder="email"
        type="text"
        value={auth.email}
        onChange={(e) => auth.changeEmail(e.target.value)} />
      <input
        placeholder="password"
        type="text"
        value={auth.password}
        onChange={(e) => auth.changePassword(e.target.value)} />
    </>
    )
  }
}

export default Login
