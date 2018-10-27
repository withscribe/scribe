import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { setLivelynessChecking } from 'mobx-state-tree'
import makeInspectable from 'mobx-devtools-mst'
import { injectGlobal } from 'react-emotion'
import decode from 'jwt-decode'

/* Import Components Start */
import Header from 'Components/Header'
import PrivateRoute from 'Components/PrivateRoute'
import PublicRoute from 'Components/PublicRoute'
import ToastProvider from 'Components/Toast/ToastProvider'
import { Wrapper, Container } from '_system/Container'
/* Import Pages Start */
import Register from 'Pages/Register'
import Login from 'Pages/Login'
import Choose from 'Pages/Choose'
import ProfileSettings from 'Pages/ProfileSettings'
import StoryEditor from 'Pages/StoryEditor'
import Home from 'Pages/Home'
import StoryPreview from 'Pages/StoryPreview'
import MyStories from 'Pages/MyStories'
import Contributions from 'Pages/Contributions'
import DiffReview from 'Pages/DiffReview'
/* Import Stores Start */
import UserStore from 'Stores/User'
import AuthStore from 'Stores/Auth'
import StoreEditorStore from 'Stores/StoryEditor'
import StoryStore from 'Stores/Story'
import ContributionsStore from 'Stores/Contributions'
import ErrorStore from 'Stores/Errors'

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
    line-height: 1;
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
  .editor {
    width: 100%;
    background-color: #efefef;
    min-height: 30vh;
    border-radius: 4px;
    padding: 1em;
  }

  .Difference {
    font-family: monospace;
  }
  
  .Difference > del {
    background-color: rgb(255, 224, 224);
    text-decoration: none;
  }
  
  .Difference > ins {
    background-color: rgb(201, 238, 211);
    text-decoration: none;
  }
`

const userStore = UserStore.create()
const authStore = AuthStore.create()
const storyEditorStore = StoreEditorStore.create()
const storyStore = StoryStore.create()
const contributionsStore = ContributionsStore.create()
const errorStore = ErrorStore.create()


setLivelynessChecking('error')
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
  storyEditorStore,
  storyStore,
  contributionsStore,
  errorStore,
}

const App = () => (
  <Provider {...store}>
    <>
      <ToastProvider />
      <Router>
        <>
          <Header />
          <Wrapper>
            <Container>
              <Switch>
                <PublicRoute exact path="/login" redirectTo="/start" component={Login} />
                <PublicRoute exact path="/register" redirectTo="/start" component={Register} />

                <PrivateRoute exact path="/home" redirectTo="/login" component={Home} />
                <PrivateRoute exact path="/story/preview/:id" redirectTo="/login" component={StoryPreview} />
                <PrivateRoute exact path="/editor/create" redirectTo="/login" component={StoryEditor} />
                <PrivateRoute exact path="/editor/:id" redirectTo="/login" component={StoryEditor} />
                <PrivateRoute exact path="/start" redirectTo="/login" component={Choose} />
                <PrivateRoute exact path="/profile" redirectTo="/login" component={MyStories} />
                <PrivateRoute exact path="/profile/settings" redirectTo="/login" component={ProfileSettings} />
                <PrivateRoute exact path="/profile/contributions" redirectTo="/login" component={Contributions} />
                <PrivateRoute exact path="/profile/contributions/diff/:id" redirectTo="/login" component={DiffReview} />
                {/* <PrivateRoute exact path="/user/stories" redirectTo="/login" component={MyStories} /> */}
              </Switch>
            </Container>
          </Wrapper>
        </>
      </Router>
    </>
  </Provider>
)

export default App

export {
  errorStore,
}
