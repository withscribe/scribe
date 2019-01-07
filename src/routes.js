import React from 'react'
import { Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import { LoadingSpinner } from '_system/Loader'
/* Import Components Start */
import Header from 'Components/Header'
import PrivateRoute from 'Components/PrivateRoute'
import PublicRoute from 'Components/PublicRoute'
import ErrorBoundary from 'Components/Error/ErrorBoundary'
import { Wrapper, Container } from '_system/Container'
/* Import Pages Start */
import Register from 'Pages/Register'
import Login from 'Pages/Login'
import Home from 'Pages/Home'
import MyStories from 'Pages/MyStories'
import Contributions from 'Pages/Contributions'
import ProfileSettings from 'Pages/ProfileSettings'
// import CreateStory from 'Pages/CreateStory'
// import EditStory from 'Pages/EditStory'
import ViewStory from 'Pages/ViewStory'
import ViewRevision from 'Pages/ViewRevision'
import ViewRevisions from 'Pages/ViewRevisions'
import DiffReview from 'Pages/DiffReview'
import Choose from 'Pages/Choose'
import Community from 'Pages/Community'

const Loading = ({ pastDelay }) => (pastDelay ? <LoadingSpinner /> : null)

const EditStory = Loadable({
  loader: () => import('Pages/EditStory'/* webpackChunkName: "EditStory" */),
  loading: ({ isLoading }) => isLoading && <Loading />,
})

const CreateStory = Loadable({
  loader: () => import('Pages/CreateStory'/* webpackChunkName: "CreateStory" */),
  loading: ({ isLoading }) => isLoading && <Loading />,
})

const Routes = () => (
  <ErrorBoundary>
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
  </ErrorBoundary>
)

export default Routes
