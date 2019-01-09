import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import {
  Card, CardTitle, CardAuthor, CardWrapper,
  CardMetaWrapper, CardMetaAction,
} from 'System/Card'
import { CardDesc } from 'System/Typography'
import { ContributeIcon, BookmarkIcon, HeartIcon } from 'System/Icons'

@inject('userStore', 'storyStore')
@observer
class StoryCard extends React.Component {
  state = {
    liked: false,
    forked: false,
    isAuthor: false,
    optimisticLikes: undefined,
  }

  componentDidMount() {
    const { userStore, story } = this.props
    const guid = story.id + userStore.me.id

    if (story.usersWhoLiked.length >= 1 && story.usersWhoLiked.filter(e => e.guid === guid).length >= 1) {
      this.setState({ liked: true })
    }

    const hasForked = story.isForked
    this.setState({ forked: hasForked })

    if (userStore.isUserAuthor(story.authorId, story.nonAuthorId)) {
      this.setState({ isAuthor: true })
    }

    this.setState({ optimisticLikes: story.likes })
  }

  likeStory = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { liked } = this.state
    let { optimisticLikes } = this.state
    if (liked) {
      const { userStore, story: { id } } = this.props
      userStore.unlikeStory(id, userStore.me.id)
      const decrementedLikeCount = optimisticLikes -= 1
      this.setState({ liked: false, optimisticLikes: decrementedLikeCount })
      return
    }
    const { userStore, story: { id } } = this.props
    const incrementedLikeCount = optimisticLikes += 1
    userStore.likeStory(id)
    this.setState({ liked: true, optimisticLikes: incrementedLikeCount })
  }

  cloneStory = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { userStore, storyStore, story } = this.props
    storyStore.clone(story.id, userStore.me.id)
  }

  forkStory = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { userStore, storyStore, story } = this.props
    storyStore.forkStory(story.id, userStore.me.id)
  }


  redirectToStory = () => {
    const { history, story: { id } } = this.props
    history.push(`/story/preview/${id}`)
  }

  render() {
    const { liked, forked, isAuthor, optimisticLikes } = this.state
    const { story } = this.props
    return (
      <Card key={story.id}>
        <CardWrapper
          onClick={() => this.redirectToStory(story.id)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Link to={`/story/preview/${story.id}`}>
                <CardTitle>{story.title}</CardTitle>
              </Link>
              <CardDesc>{story.description}</CardDesc>
            </div>
          </div>
          <CardMetaWrapper>
            <CardMetaAction onClick={this.likeStory}>
              {liked
                ? <><HeartIcon />Liked {optimisticLikes}</>
                : <><HeartIcon />Like {optimisticLikes}</>
              }
            </CardMetaAction>
            <CardMetaAction onClick={this.cloneStory}>
              <BookmarkIcon />
              Save
            </CardMetaAction>
            <CardMetaAction onClick={this.forkStory}>
              <ContributeIcon />
              Contribute
            </CardMetaAction>
            <CardAuthor>by @{story.authorProfile.userName}</CardAuthor>
          </CardMetaWrapper>
        </CardWrapper>
      </Card>
    )
  }
}

/* eslint-disable react/no-multi-comp */
class ProfileStoryCard extends React.PureComponent {
  redirectToStory = () => {
    const { history, story } = this.props
    let generatedLink = `/story/preview/${story.id}`
    if (story.isForked) {
      generatedLink = `/story/preview/fork/${story.id}`
    } else if (story.isCloned) {
      generatedLink = `/story/preview/clone/${story.id}`
    }
    history.push(generatedLink)
  }

  render() {
    const { story } = this.props
    return (
      <Card key={story.id}>
        <CardWrapper
          onClick={() => this.redirectToStory(story.id)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Link to={`/story/preview/${story.id}`}>
                <CardTitle>{story.title}</CardTitle>
              </Link>
              <CardDesc>{story.description}</CardDesc>
            </div>
          </div>
        </CardWrapper>
      </Card>
    )
  }
}

export default StoryCard

export {
  ProfileStoryCard,
}
