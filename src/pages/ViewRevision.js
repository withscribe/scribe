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
import { ContributionWrapper } from 'Styled/Contributions'
import { ListCard } from '_system/ListCard'
import { ContributionsGrid } from '_system/Grid'

@inject('storyStore', 'userStore', 'toastStore')
@observer
class ViewStory extends React.Component {
  state = {
    isAuthor: false,
  }

  componentDidMount() {
    const { storyStore, userStore } = this.props

    const storyId = this.props.match.params.storyId
    const revisionId = this.props.match.params.revisionId

    storyStore.getStory(storyId).then(() => {
      if (storyStore.story.authorId === userStore.me.id || storyStore.story.nonAuthorId === userStore.me.id) {
        this.setState({ isAuthor: true })
      }
    })
    storyStore.getRevision(revisionId).then(() => {
      // do something
    })
  }

  componentWillUnmount() {
    const { storyStore } = this.props
    storyStore.destroyLoadedStory()
  }

  render() {
    const { storyStore: { story, revision }, storyStore } = this.props
    const { isAuthor } = this.state
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
          {!storyStore.fetchingStory && story
            && <>
              <TitleText>
                {story.title}
              </TitleText>
              <Label>
                By: {story.author ? story.author : 'No Author Assigned.'}
              </Label>

          </>
          }
          {!storyStore.fetchingRevision && revision
          && <>
              <StoryViewer content={revision.content} />

              {isAuthor
                && (
                  <Link to={`/story/edit/${storyStore.story.id}`}>Revert</Link>
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
  match: PropTypes.object.isRequired,
}

export default ViewStory



