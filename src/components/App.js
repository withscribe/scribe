import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { onSnapshot } from 'mobx-state-tree'
import makeInspectable from 'mobx-devtools-mst'
import { injectGlobal } from 'react-emotion'
import decode from 'jwt-decode'

import Header from 'Components/Header'
import PrivateRoute from 'Components/PrivateRoute'
import PublicRoute from 'Components/PublicRoute'
import Register from 'Pages/Register'
import Login from 'Pages/Login'
import Choose from 'Pages/Choose'
import ProfileSettings from 'Pages/ProfileSettings'

import UserStore from '../stores/User'
import AuthStore from '../stores/Auth'
import ProfileStore from '../stores/Profile'
import TR from '../assets/fonts/Theinhardt-Regular.woff'
import TB from '../assets/fonts/Theinhardt-Bold.woff'

// eslint-disable-next-line
injectGlobal`
  @font-face {
    font-family: Theinhardt;
    src: url(${TR}) format('woff');
  }
  @font-face {
    font-family: Theinhardt-Bold;
    src: url(${TB}) format('woff');
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Theinhardt;
    letter-spacing: auto;
    line-height: 1.5em;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    font-weight: 300;
    margin: 0;
    padding: 0;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    overflow-x: hidden;
    background: #fff;
  }
  a {
    text-decoration: none;
    color: #333;
  }
`

const userStore = UserStore.create()
const authStore = AuthStore.create()
const profileStore = ProfileStore.create()
/*
 * Let the stores be accessable to the browser plugin
 */
makeInspectable(userStore, authStore)

/*
 * Check if a token exists in localstorage, if it does
 * get it, and pull the users data into the store
 * TODO: this use the login mutation and logic
 */
if (localStorage.getItem('token')) {
  const fromToken = decode(localStorage.getItem('token'))
  console.log(`data from local token: ${fromToken}`)
  userStore.pullMeById(fromToken.accountId)
}

/*
 * Init our store object, which is given to the provider
 */
const store = {
  userStore,
  authStore,
  profileStore,
}

const App = () => (
  <Provider {...store}>
    <Router>
      <>
        <Header />
        <Switch>
          <PublicRoute exact path="/login" redirectTo="/start" component={Login} />
          <PublicRoute exact path="/register" redirectTo="/start" component={Register} />

          <PrivateRoute exact path="/start" redirectTo="/login" component={Choose} />
          <PrivateRoute exact path="/profile" redirectTo="/login" component={ProfileSettings} />
          <PrivateRoute exact path="/profile/settings" redirectTo="/login" component={ProfileSettings} />
        </Switch>
      </>
    </Router>
  </Provider>
)

export default App
