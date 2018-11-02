import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { Button } from '_system/Button'
import { TitleText } from '_system/Typography'
import { HomeGrid } from '_system/Grid'
import { GhostWrapper, GhostSmall } from '_system/Ghost'
import StoryViewer from 'Components/Papyrus/StoryViewer'

@inject('storyStore', 'userStore', 'toastStore')
@observer
class ViewStory extends React.Component {
  state = {
    liked: false,
    forked: false,
    isAuthor: false,
  }

  componentDidMount() {
    const { storyStore, userStore } = this.props
    const storyId = this.props.match.params.id

    storyStore.getStory(storyId).then(() => {
      const guid = storyId + userStore.id
      if (storyStore.story.usersWhoLiked.length >= 1 && storyStore.story.usersWhoLiked.filter(e => e.guid === guid)) {
        this.setState({ liked: true })
      }
      const hasForked = storyStore.story.isForked
      this.setState({ forked: hasForked })

      if (storyStore.story.authorId === userStore.me.id
      || storyStore.story.nonAuthorId === userStore.me.id) {
        this.setState({ isAuthor: true })
      }
    })
  }

  componentWillUnmount() {
    const { storyStore } = this.props
    storyStore.destroyLoadedStory()
  }

  cloneStory = (parentStoryId) => {
    const { storyStore, userStore, toastStore } = this.props
    storyStore.clone(parentStoryId, userStore.me.id)
    toastStore.addToast({
      id: '' + Math.random() + '',
      message: 'Story Cloned Successfully',
      display: true,
    })
  }

  likeStory = (storyId) => {
    const { storyStore } = this.props
    storyStore.likeStory(storyId)
    this.setState({ liked: true })
  }

  forkStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.forkStory(parentStoryId, userStore.me.id)
    this.setState({ forked: true })
  }

  render() {
    const { storyStore: { story }, storyStore } = this.props
    const { liked, forked, isAuthor } = this.state
    // console.log('fetchingStory — ', storyStore.fetchingStory, 'story —', storyStore.story)
    // console.log('res:', storyStore.fetchingStory !== true && storyStore.story !== null)
    return (
        <>
          <GhostWrapper isDoneRendering={storyStore.fetchingStory}>
            <HomeGrid>
              <GhostSmall style={{ backgroundColor: '#efefef' }} />
              <GhostSmall style={{ backgroundColor: '#efefef' }} />
              <GhostSmall style={{ backgroundColor: '#efefef' }} />
              <GhostSmall style={{ backgroundColor: '#efefef' }} />
            </HomeGrid>
          </GhostWrapper>
          {!storyStore.fetchingStory && storyStore.story
            && <>
              <TitleText>
                {story.title}
              </TitleText>
              <Label>
                By: {story.author ? story.author : 'No Author Assigned.'}
              </Label>

              <StoryViewer content={story.content} />

              {!isAuthor
                && <Button onClick={() => this.cloneStory(story.id)}>Clone Story</Button>
              }
              {!isAuthor
                && (liked
                  ? <Button>Liked!</Button>
                  : <Button onClick={() => this.likeStory(story.id)}>Like</Button>
                )
              }
              {!isAuthor
                && (forked
                  ? <Button>Contributed!</Button>
                  : <Button onClick={() => this.forkStory(story.id)}>Contribute</Button>
                )
              }
              {isAuthor
                && (
                  <Link to={`/story/edit/${storyStore.story.id}`}>Edit</Link>
                )
              }
            </>
          }
      </>
    )
  }
}

ViewStory.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  toastStore: PropTypes.object.isRequired,
}

export default ViewStory
