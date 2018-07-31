import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import makeInspectable from 'mobx-devtools-mst'
import { injectGlobal } from 'styled-components'

import Header from 'Components/Header'
import Login from 'Components/Login'
import PrivateRoute from 'Components/PrivateRoute'
import Choose from 'Pages/Choose'

import UserStore from '../stores/User'
import AuthStore from '../stores/Auth'
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
    box-sizing: border-box;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    overflow-x: hidden;
    background: #fff;
  }
`

const userStore = UserStore.create()
const authStore = AuthStore.create()
makeInspectable(userStore, authStore)

const store = {
  user: userStore,
  auth: authStore,
}

const App = () => (
  <Provider {...store}>
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/start" redirectTo="/login" component={Choose} />
        </Switch>
      </>
    </Router>
  </Provider>
)

export default App
