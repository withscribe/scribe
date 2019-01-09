import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import {
  Card, CardTitle, CardAuthor, CardWrapper,
  CardMetaWrapper, CardMetaAction,
} from 'system/Card'
import { CardDesc } from 'system/Typography'
import { ContributeIcon, BookmarkIcon, HeartIcon } from 'system/Icons'
import Badge from 'system/Badge'

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

    if (story.authorId === userStore.me.id
    || story.nonAuthorId === userStore.me.id) {
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
    const { userStore, storyStore, story: { parentStoryId } } = this.props
    console.log(this.props.story)
    storyStore.clone(parentStoryId, userStore.me.id)
  }

  forkStory = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { userStore, storyStore, storyStore: { parentStoryId } } = this.props
    storyStore.forkStory(parentStoryId, userStore.me.id)
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
            {/* <div> */}
            {/*   <Badge>New</Badge> */}
            {/*   <Badge>Hot</Badge> */}
            {/* </div> */}
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
class CommunityCard extends React.PureComponent {
  redirectToStory = () => {
    const { history, community } = this.props
    history.push(`/~${community.name}`)
  }

  render() {
    const { community } = this.props
    console.log(community)
    return (
      <Card key={community.id}>
        <CardWrapper
          onClick={this.redirectToStory}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Link to={`/~${community.name}`}>
                <CardTitle>~{community.name}</CardTitle>
              </Link>
              <CardDesc>{community.description}</CardDesc>
            </div>
            <div>
              {community.stories.length >= 1 || community.stories.length === 0
                ? <Badge>{community.stories.length} stories</Badge>
                : <Badge>{community.stories.length} story</Badge>
              }

              {community.members.length >= 1 || community.members.length === 0
                ? <Badge>{community.members.length} members</Badge>
                : <Badge>{community.members.length} member</Badge>
              }
            </div>
          </div>
        </CardWrapper>
      </Card>
    )
  }
}

export default CommunityCard
