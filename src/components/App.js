import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
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
import Home from 'Pages/Home'
import MyStories from 'Pages/MyStories'
import Contributions from 'Pages/Contributions'
import ProfileSettings from 'Pages/ProfileSettings'
import CreateStory from 'Pages/CreateStory'
import EditStory from 'Pages/EditStory'
import ViewStory from 'Pages/ViewStory'
import ViewRevision from 'Pages/ViewRevision'
import ViewRevisions from 'Pages/ViewRevisions'
import ViewFork from 'Pages/ViewFork'
import ViewClone from 'Pages/ViewClone'
import DiffReview from 'Pages/DiffReview'
import Choose from 'Pages/Choose'
import Community from 'Pages/Community'
/* Import Stores Start */
import UserStore from 'Stores/User'
import AuthStore from 'Stores/Auth'
import StoreEditorStore from 'Stores/StoryEditor'
import StoryStore from 'Stores/Story'
import ContributionsStore from 'Stores/Contributions'
import CommunityStore from 'Stores/Community'
import ToastStore from 'Stores/Toasts'

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
    line-height: normal;
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
    background-color: #fff;
    color: #0F131A;
    /* background-color: #f6f8fa; */
  }
  a {
    text-decoration: none;
    color: #333;
  }
  .editor {
    width: 100%;
    background-color: #F9F9FB;
    min-height: 30vh;
    border-radius: 4px;
    padding: 1em;
    margin-bottom: 1em;
  }
`

const userStore = UserStore.create()
const authStore = AuthStore.create()
const storyEditorStore = StoreEditorStore.create()
const storyStore = StoryStore.create()
const contributionsStore = ContributionsStore.create()
const toastStore = ToastStore.create()
const communityStore = CommunityStore.create()

/*
 * Check if a token exists in localstorage, if it does
 * get it, and pull the users data into the store
 * TODO: this use the login mutation and logic
 */
if (localStorage.getItem('token')) {
  const fromToken = decode(localStorage.getItem('token'))
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
  toastStore,
  communityStore,
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
                <PublicRoute exact path="/login" redirectTo="/home" component={Login} />
                <PublicRoute exact path="/register" redirectTo="/home" component={Register} />

                <PrivateRoute exact path="/home" redirectTo="/login" component={Home} />

                <PrivateRoute exact path="/~:name" redirectTo="/login" component={Community} />

                <PrivateRoute exact path="/story/preview/fork/:id" redirectTo="/login" component={ViewStory} />
                <PrivateRoute exact path="/story/preview/clone/:id" redirectTo="/login" component={ViewStory} />
                <PrivateRoute exact path="/story/preview/:id" redirectTo="/login" component={ViewStory} />
                <PrivateRoute exact path="/story/revisions/:storyId/" redirectTo="/login" component={ViewRevisions} />
                <PrivateRoute exact path="/story/revisions/:storyId/:revisionId" redirectTo="/login" component={ViewRevision} />

                <PrivateRoute exact path="/story/create" redirectTo="/login" component={CreateStory} />
                <PrivateRoute exact path="/story/edit/:id" redirectTo="/login" component={EditStory} />

                <PrivateRoute exact path="/start" redirectTo="/login" component={Choose} />

                <PrivateRoute exact path="/profile" redirectTo="/login" component={MyStories} />
                <PrivateRoute exact path="/profile/settings" redirectTo="/login" component={ProfileSettings} />
                <PrivateRoute exact path="/profile/contributions" redirectTo="/login" component={Contributions} />
                <PrivateRoute exact path="/profile/contributions/diff/:id" redirectTo="/login" component={DiffReview} />
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
  toastStore,
}
