import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Label } from 'system/Input'
import { TitleText } from 'system/Typography'
import { HomeGrid } from 'system/Grid'
import { GhostWrapper, GhostSmall } from 'system/Ghost'
import RevisionCard from 'Components/RevisionCard'

@inject('storyStore', 'userStore')
@observer
class ViewRevisions extends React.Component {
  state = {
    revisions: [],
  }

  componentDidMount() {
    const { storyStore, match: { params: { storyId } } } = this.props

    storyStore.getStory(storyId).then(() => {
      const revisions = []
      storyStore.story.revisions.map(revision => revisions.push(revision))
      this.setState({ revisions })
    })
  }

  componentWillUnmount() {
    const { storyStore } = this.props
    storyStore.destroyLoadedStory()
  }

  render() {
    const { storyStore: { story }, storyStore, history } = this.props
    const { revisions } = this.state
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
              By:
              {story.author ? story.author : 'No Author Assigned.'}
            </Label>

            {revisions
            && <>
              {revisions.map((revision, index) => (
                <RevisionCard history={history} story={story} revision={revision} key={revision.id} pos={index} />
              ))}
            </>
            }
          </>
          }
        </>
    )
  }
}

ViewRevisions.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default ViewRevisions
