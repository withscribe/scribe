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
`

const userStore = UserStore.create()
const authStore = AuthStore.create()
makeInspectable(userStore, authStore)

if (localStorage.getItem('token')) {
  const fromToken = decode(localStorage.getItem('token'))
  console.log(fromToken)
  userStore.pullMeById(fromToken.accountId)
}


/*
  not sure if this is necessary, the only time setting 'me' should occur
  is logging in. We dont want to update it after EVERY change.
*/
// eslint-disable-next-line
onSnapshot(userStore, snapshot => {
  console.log(`here is the snapshot ${snapshot}`)
  // localStorage.setItem('me', JSON.stringify(snapshot))
})


const store = {
  userStore,
  authStore,
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
        </Switch>
      </>
    </Router>
  </Provider>
)

export default App
