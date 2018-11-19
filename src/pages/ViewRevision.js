import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import Diff from 'react-stylable-diff'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

import { Label } from '_system/Input'
import { ButtonPrimary } from '_system/Button'
import { TitleText } from '_system/Typography'
import { HomeGrid } from '_system/Grid'
import { GhostWrapper, GhostSmall } from '_system/Ghost'

@inject('storyStore', 'userStore', 'toastStore')
@observer
class ViewRevision extends React.Component {
  state = {
    isAuthor: false,
  }

  componentDidMount() {
    const {
      storyStore,
      userStore,
      match: { params: { storyId } },
      match: { params: { revisionId } },
    } = this.props

    storyStore.getStory(storyId).then(() => {
      if (storyStore.story.authorId === userStore.me.id || storyStore.story.nonAuthorId === userStore.me.id) {
        this.setState({ isAuthor: true })
      }
    })
    storyStore.getRevision(revisionId)
  }

  componentWillUnmount() {
    const { storyStore } = this.props
    storyStore.destroyLoadedStory()
  }

  deserializeContent = (content) => {
    const json = JSON.parse(content)
    const temp = Value.fromJSON(json)
    return Plain.serialize(temp)
  }

  handleRevertClick = () => {
    const { storyStore } = this.props

    storyStore.revertStory()
      .then(() => {
        console.log('revertStory success')
      })
      .catch(() => {
        console.log('revertStory error')
      })
  }

  render() {
    const { storyStore: { story, revision }, storyStore } = this.props
    const { isAuthor } = this.state
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

            {!storyStore.fetchingRevision && revision
            && <Diff
              inputA={this.deserializeContent(story.content)}
              inputB={this.deserializeContent(revision.content)} />
            }
          </>
          }
          {isAuthor
          && <ButtonPrimary type="button" onClick={this.handleRevertClick}>Revert</ButtonPrimary>
          }
      </>
    )
  }
}

ViewRevision.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  toastStore: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default ViewRevision



