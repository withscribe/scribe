import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { Global, css } from '@emotion/core'
import decode from 'jwt-decode'

/* Import Hot Routes */
import Routes from '../hot-routes'
/* Import Other  */
import TR from '../assets/fonts/Theinhardt-Regular.woff'
import TB from '../assets/fonts/Theinhardt-Bold.woff'

import ToastProvider from 'Components/Toast/ToastProvider'
/* Import Stores Start */
import UserStore from 'Stores/User'
import AuthStore from 'Stores/Auth'
import StoreEditorStore from 'Stores/StoryEditor'
import StoryStore from 'Stores/Story'
import ContributionsStore from 'Stores/Contributions'
import CommunityStore from 'Stores/Community'
import ToastStore from 'Stores/Toasts'

// eslint-disable-next-line
const global = css`
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
      <Global styles={global} />
      <ToastProvider />
      <Router>
        <Routes />
      </Router>
    </>
  </Provider>
)

export default App

export {
  toastStore,
}
