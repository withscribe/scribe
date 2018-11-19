import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ReactDiffViewer from 'react-diff-viewer'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

import { Label } from '_system/Input'
import { ButtonPrimary } from '_system/Button'
import { TitleText } from '_system/Typography'
import { HomeGrid } from '_system/Grid'
import { GhostWrapper, GhostSmall } from '_system/Ghost'
import {
  ContributeButton, ContributeGrid, ActionInfo,
} from 'styled/ViewStory'

@inject('storyStore', 'userStore', 'storyEditorStore')
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
    const {
      storyEditorStore, history,
      match: { params: { storyId } },
      match: { params: { revisionId } }
    } = this.props

    storyEditorStore.revertStory(storyId, revisionId)
      .then(() => {
        history.push(`/story/preview/${storyId}`)
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
                By:
                {story.author ? story.author : 'No Author Assigned.'}
              </Label>

            {!storyStore.fetchingRevision && revision
            && <ReactDiffViewer
              oldValue={this.deserializeContent(story.content)}
              newValue={this.deserializeContent(revision.content)}
              splitView={true}
            />
            }
          </>
          }
          {isAuthor
          &&
          <ContributeGrid>
            <ContributeButton onClick={this.handleRevertClick}>
              Revert
              <ActionInfo>
                Restore this story to this specific state.
              </ActionInfo>
            </ContributeButton>
            {/*<Tooltip hover={this.showTooltip} shouldShow={showContributeTooltip}/>*/}
          </ContributeGrid>

          }
      </>
    )
  }
}

ViewRevision.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  storyEditorStore: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default ViewRevision



