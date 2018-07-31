import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

/* eslint-disable no-undef */
const PrivateRoute = ({
  component: Component, user, redirectTo, ...rest
}) => {
  console.log(user)
  return (
  <Route
    {...rest}
    render={props => (
      user.me ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location },
          }} />
      )
    )} />
  )
}

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
}


export default inject('user')(observer(PrivateRoute))
