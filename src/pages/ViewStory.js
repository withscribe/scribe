import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Label } from '_system/Input'
import { Button } from '_system/Button'
import { TitleText, TitleSecondary, AuthorLabel } from '_system/Typography'
import { HomeGrid } from '_system/Grid'
import { GhostWrapper, GhostSmall } from '_system/Ghost'
import StoryViewer from 'Components/Papyrus/StoryViewer'
import {
  ViewStoryWrapper, StoryGrid, ContributeButton,
  CloneButton, SecondaryTitleGrid, CloneGrid, ContributeGrid, ActionInfo,
} from 'styled/ViewStory'
import Tooltip from 'Components/Tooltip'

@inject('storyStore', 'userStore', 'toastStore')
@observer
class ViewStory extends React.Component {
  state = {
    liked: false,
    forked: false,
    isAuthor: false,
    hasRevisions: false,
    showContributeTooltip: false,
    showCloneTooltip: false,
  }

  componentDidMount() {
    const { storyStore, userStore } = this.props
    const storyId = this.props.match.params.id

    storyStore.getStory(storyId).then(() => {
      const guid = storyId + userStore.me.id
      if (storyStore.story.usersWhoLiked.length >= 1 && storyStore.story.usersWhoLiked.filter(e => e.guid === guid)) {
        this.setState({ liked: true })
      }
      const hasForked = storyStore.story.isForked
      this.setState({ forked: hasForked })

      if (storyStore.story.authorId === userStore.me.id
      || storyStore.story.nonAuthorId === userStore.me.id) {
        this.setState({ isAuthor: true })
      }

      if (storyStore.story.revisions != null && storyStore.story.revisions.length > 0) {
        this.setState({ hasRevisions: true })
      }
    })
  }

  componentWillUnmount() {
    const { storyStore } = this.props
    storyStore.destroyLoadedStory()
  }

  cloneStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.clone(parentStoryId, userStore.me.id)
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

  showTooltip = () => {
    console.log("Hey you're here")
    this.setState({ showContributeTooltip: true })
  }

  render() {
    const { storyStore: { story }, storyStore } = this.props
    const { liked, forked, isAuthor, hasRevisions, showContributeTooltip } = this.state
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
                <AuthorLabel>
                  By:
                  {story.author
                    ? story.author
                    : 'No Author Assigned.'}
                </AuthorLabel>
              </TitleText>
              <ViewStoryWrapper>
                <StoryGrid>
                  <StoryViewer content={story.content} />
                </StoryGrid>
                {!isAuthor
                  && (
                    <SecondaryTitleGrid>
                      <TitleSecondary>
                        Have an idea?
                      </TitleSecondary>
                    </SecondaryTitleGrid>
                  )
                }
                {!isAuthor
                  && (
                    <CloneGrid>
                      <CloneButton onClick={() => this.cloneStory(story.id)}>
                        Clone Story
                        <ActionInfo>
                          Make a personal copy of this story and use it as
                          a starting point or to draw inspiration from.
                        </ActionInfo>
                      </CloneButton>
                    </CloneGrid>
                  )
                }
                {!isAuthor
                  && (liked
                    ? <Button>Liked!</Button>
                    : <Button onClick={() => this.likeStory(story.id)}>Like</Button>
                  )
                }
                {!isAuthor
                  && (forked
                    ? (
                      <ContributeGrid>
                        <ContributeButton>
                          Contributed!
                          <ActionInfo>
                            A Copy has been created. Check MyStories.
                          </ActionInfo>
                        </ContributeButton>
                      </ContributeGrid>
                    )
                    : (
                      <ContributeGrid>
                        <ContributeButton onClick={() => this.forkStory(story.id)}>
                          Contribute
                          <ActionInfo>
                            Make an editable copy of this story to suggest improvements
                            or additions to the author of the story.
                          </ActionInfo>
                        </ContributeButton>
                        <Tooltip hover={this.showTooltip} shouldShow={showContributeTooltip} />
                      </ContributeGrid>
                    )
                  )
                }
                {isAuthor
                  && (
                    <Link to={`/story/edit/${storyStore.story.id}`}>Edit</Link>
                  )
                }
                {isAuthor && hasRevisions
                && (
                  <Link to={`/story/revisions/${story.id}/`}>
                    <Button onClick={() => this.likeStory(story.id)}>View History</Button>
                  </Link>
                )
                }
              </ViewStoryWrapper>
            </>
          }
      </>
    )
  }
}

ViewStory.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
}

export default ViewStory
