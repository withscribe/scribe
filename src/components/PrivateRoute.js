import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { LoadingSpinner } from 'System/Loader'
/* eslint-disable no-undef */
const PrivateRoute = ({
  component: Component, userStore, redirectTo, ...rest
}) => {
  const { pullingLoginData } = userStore
  return (
    <>
      {pullingLoginData
        ? (<LoadingSpinner />)
        : (
          <Route
            {...rest}
            render={props => (
              userStore.me ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: redirectTo,
                    state: { from: props.location },
                  }} />
              )
            )} />
        )}
  </>
  )
}

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  userStore: PropTypes.shape({}),
}


export default inject('userStore')(observer(PrivateRoute))
