import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Button from '_system/Button'
import { TitleSecondary } from '_system/Typography'
import { LoadingSpinner } from '_system/Loader'
import { GhostWrapper } from '_system/Ghost'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'
import { HeartIcon, EditIcon, HistoryIcon } from '_system/Icons'
import StoryViewer from 'Components/Papyrus/StoryViewer'
import {
  ViewStoryGrid, ViewStoryWidthAdapter,
  SecondaryTitleGridPosition, CloneGridPosition, ContributeGridPosition,
} from 'styled/ViewStory'
import Tooltip from 'Components/Tooltip'

@inject('storyStore', 'userStore')
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
      if (storyStore.story.usersWhoLiked.length >= 1 && storyStore.story.usersWhoLiked.filter(e => e.guid === guid).length >= 1) {
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
    const { liked } = this.state
    const { userStore } = this.props
    if (liked) {
      userStore.unlikeStory(storyId, userStore.me.id)
      this.setState({ liked: false })
      return
    }
    userStore.likeStory(storyId)
    this.setState({ liked: true })
  }

  forkStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.forkStory(parentStoryId, userStore.me.id)
    this.setState({ forked: true })
  }

  toggleContrbuteTooltip = () => {
    this.setState(prevState => (
      { showContributeTooltip: !prevState.showContributeTooltip }))
  }

  toggleCloneTooltip = () => {
    this.setState(prevState => (
      { showCloneTooltip: !prevState.showCloneTooltip }))
  }

  render() {
    const { storyStore: { story }, storyStore } = this.props
    const { liked, forked, isAuthor, hasRevisions, showContributeTooltip, showCloneTooltip } = this.state
    return (
      <ViewStoryWidthAdapter>
        <GhostWrapper isDoneRendering={storyStore.fetchingStory}>
          <LoadingSpinner />
        </GhostWrapper>
        {!storyStore.fetchingStory && storyStore.story
          && <>
            <Hero appearance="grey">
              <HeroPrimaryText>
                {story.title}
              </HeroPrimaryText>
              <HeroSpanText>
                By: {story.author}
              </HeroSpanText>
            </Hero>
            <div style={{ marginBottom: '1em' }}>
              <Button
                appearance="default"
                onClick={() => this.likeStory(story.id)}>
                {liked
                  ? <><HeartIcon />Liked</>
                  : <><HeartIcon />Like</>
                }
              </Button>
              {isAuthor
                && (
                  <Link to={`/story/edit/${storyStore.story.id}`}>
                    <Button
                      appearance="minimal"
                      intent="warning">
                      <><EditIcon /> Edit</>
                    </Button>
                  </Link>
                )
              }
              {isAuthor && hasRevisions
                && (
                  <Link to={`/story/revisions/${story.id}/`}>
                    <Button
                      appearance="minimal"
                      onClick={() => this.likeStory(story.id)}>
                      <><HistoryIcon /> View History</>
                    </Button>
                  </Link>
                )
              }
            </div>
            <ViewStoryGrid>
              <StoryViewer style={{ gridColumn: '1', gridRow: '1 / -1' }} content={story.content} />
              {!isAuthor
                && (<>
                  <TitleSecondary className={SecondaryTitleGridPosition}>
                    Have an idea?
                  </TitleSecondary>

                  <ContributeGridPosition>
                    <Button
                      appearance="default"
                      onClick={() => this.forkStory(story.id)}>
                      {forked
                        ? 'Contributed!'
                        : 'Contribute'
                      }
                    </Button>
                    <Tooltip
                      onHover={this.toggleContrbuteTooltip}
                      shouldShow={showContributeTooltip}
                      text='Make an editable copy of this story to suggest improvements or additions to the author of the story.' />
                  </ContributeGridPosition>

                  <CloneGridPosition>
                    <Button
                      appearance="default"
                      onClick={() => this.cloneStory(story.id)}>
                      Clone Story
                    </Button>
                    <Tooltip
                      onHover={this.toggleCloneTooltip}
                      shouldShow={showCloneTooltip}
                      text='Make a personal copy of this story and use it as a starting point or to draw inspiration from.' />
                  </CloneGridPosition>
                </>)
              }
            </ViewStoryGrid>
          </>
        }
      </ViewStoryWidthAdapter>
    )
  }
}

ViewStory.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
}

export default ViewStory
