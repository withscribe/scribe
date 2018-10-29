import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { EditorWrapper } from 'Styled/Editor'
import Input, {
  Label, LabelConstraint,
} from '_system/Input'
import { TitleText } from '_system/Typography'
import { ButtonPrimary } from '_system/Button'
import TextEditor from 'Components/Papyrus/TextEditor'

@inject('storyEditorStore', 'userStore', 'toastStore')
@observer
class EditStory extends React.Component {
  state = {
    permission: false,
    showForkDetails: false,
  }

  componentDidMount() {
    const { storyEditorStore, userStore } = this.props
    const storyId = this.props.match.params.id

    storyEditorStore.loadStory(storyId).then(() => {
      if (storyEditorStore.authorId === userStore.me.id
      || storyEditorStore.nonAuthorId === userStore.me.id) {
        console.log('we are allowed to be here')
        this.setState({ permission: true })
      } else {
        return (
          <Redirect to={`/story/preview/${storyId}`} />
        )
      }

      if (storyEditorStore.isForked) {
        console.log('hello')
        this.setState({ showForkDetails: true })
      }
    })
  }

  componentWillUnmount() {
    // TODO: Fix this monkeypatch with an action using destroy()
    const { storyEditorStore } = this.props
    storyEditorStore.init()
  }

  sendContributionRequest = () => {
    const { storyEditorStore, toastStore } = this.props

    storyEditorStore.sendContribution(storyEditorStore.storyId)
      .then((res) => {
        console.log(`UpdateStory Response: ${res}`)
        toastStore.addToast({
          id: '' + Math.random() + '',
          message: 'Your Contribution Request has been sent!',
          display: true,
        })
      }).catch((err) => {
        console.log(`UpdateStory Error: ${err}`)
      })
  }

  handleUpdateClick = () => {
    const { storyEditorStore } = this.props

    storyEditorStore.updateStory()
      .then((res) => {
        console.log(`UpdateStory Response: ${res}`)
      }).catch((err) => {
        console.log(`UpdateStory Error: ${err}`)
      })
  }

  serializedStoryUpdateCallback = (update) => {
    const { storyEditorStore } = this.props
    storyEditorStore.changeContent(update)
  }

  render() {
    const { storyEditorStore } = this.props
    const { showForkDetails } = this.state
    return (
      <EditorWrapper>
        <TitleText>{storyEditorStore.title}</TitleText>
        {storyEditorStore.content
          && <TextEditor content={storyEditorStore.content} get={this.serializedStoryUpdateCallback} />
        }
        <ButtonPrimary type="button" disabled={storyEditorStore.saveInProgress} onClick={this.handleUpdateClick}>
          {storyEditorStore.saveInProgress ? 'Saving' : 'Update'}
        </ButtonPrimary>
        {showForkDetails
          && <ButtonPrimary type="button" onClick={this.sendContributionRequest}>Send Contribution Request</ButtonPrimary>
        }
      </EditorWrapper>
    )
  }
}

export default EditStory
