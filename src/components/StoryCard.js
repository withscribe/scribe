import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import {
  Card, CardTitle, CardAuthor, CardWrapper, CardBadgeWrapper, CardMetaWrapper, CardMetaAction,
} from '_system/Card'
import { CardDesc } from '_system/Typography'
import Badge from '_system/Badge'

@inject('userStore')
@observer
class StoryCard extends React.Component {
  state = {
    liked: undefined,
    forked: undefined,
    isAuthor: undefined,
  }

  componentDidMount() {
    const { userStore, story } = this.props
    const guid = story.id + userStore.me.id

    if (story.usersWhoLiked.length >= 1 && story.usersWhoLiked.filter(e => e.guid === guid)) {
      this.setState({ liked: true })
    }

    const hasForked = story.isForked
    this.setState({ forked: hasForked })

    if (story.authorId === userStore.me.id
    || story.nonAuthorId === userStore.me.id) {
      this.setState({ isAuthor: true })
    }
  }

  likeStory = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { liked } = this.state
    if (liked) {
      const { userStore, story: { id } } = this.props
      console.log('unlike')
      userStore.unlikeStory(id)
      this.setState({ liked: false })
      return
    }
    console.log('like')
    const { userStore, story: { id } } = this.props
    userStore.likeStory(id)
    this.setState({ liked: true })
  }

  redirectToStory = () => {
    const { history, story: { id } } = this.props
    history.push(`/story/preview/${id}`)
  }

  render() {
    const { liked, forked, isAuthor } = this.state
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
            <div>
              <Badge>New</Badge>
              <Badge>Hot</Badge>
            </div>
          </div>
          <CardMetaWrapper>
            <CardMetaAction onClick={this.likeStory}>
              { liked
                ? `Liked! ${story.likes}`
                : `+ Like ${story.likes}`
              }
            </CardMetaAction>
            <CardMetaAction>[] Save</CardMetaAction>
            <CardMetaAction>() Contribute</CardMetaAction>
            <CardAuthor>posted by u/{story.authorProfile.userName}</CardAuthor>
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
      generatedLink = `story/preview/clone/${story.id}`
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
