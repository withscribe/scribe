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

@inject('storyEditorStore', 'userStore')
@observer
class ViewFork extends React.Component {
  state = {}

  componentDidMount() {
    const { storyEditorStore, userStore } = this.props
    const storyId = this.props.match.params.id

    storyEditorStore.loadStory(storyId).then(() => {
      if (!storyEditorStore.isForked) {
        return (
          <Redirect
            to={`/story/preview/${storyEditorStore.story.id}`} />
        )
      }
    })
  }

  componentWillUnmount() {
    // TODO: Fix this monkeypatch with an action using destroy()
    const { storyEditorStore } = this.props
    storyEditorStore.init()
  }

  handleSubmitClick = () => {
    const { storyEditorStore, userStore } = this.props

    if (storyEditorStore.isValid) {
      const author = this.getAuthorName(
        userStore.me.firstName,
        userStore.me.lastName,
        userStore.me.userName,
      )
      storyEditorStore.submitStory(userStore.me.id, author)
        .then((res) => {
          console.log(`SubmitStory Response: ${res}`)
        }).catch((err) => {
          console.log(`SubmitStory Error: ${err}`)
        })
    }
  }

  handleUpdateClick = () => {
    const { storyEditorStore } = this.props

    if (storyEditorStore.isValid) {
      storyEditorStore.updateStory()
        .then((res) => {
          console.log(`UpdateStory Response: ${res}`)
        }).catch((err) => {
          console.log(`UpdateStory Error: ${err}`)
        })
    }
  }

  sendContributionRequest = () => {
    const { storyEditorStore } = this.props

    if (storyEditorStore.isValid) {
      storyEditorStore.sendContribution(storyEditorStore.storyId)
        .then((res) => {
          console.log(`UpdateStory Response: ${res}`)
        }).catch((err) => {
          console.log(`UpdateStory Error: ${err}`)
        })
    }
  }

  serializedStoryUpdateCallback = (update) => {
    const { storyEditorStore } = this.props
    storyEditorStore.changeContent(update)
  }

  render() {
    const { storyEditorStore } = this.props
    console.log(storyEditorStore.content)
    return (
      <EditorWrapper>
        <ButtonPrimary type="button" disabled={storyEditorStore.saveInProgress} onClick={this.handleUpdateClick}>
          {storyEditorStore.saveInProgress ? 'Saving' : 'Update'}
        </ButtonPrimary>
        {storyEditorStore.content &&
        <TextEditor content={storyEditorStore.content} get={this.serializedStoryUpdateCallback} />}
        <ButtonPrimary type="button" onClick={this.sendContributionRequest}>Send Contribution Request</ButtonPrimary>
        <ButtonPrimary type="button" onClick={this.handleSubmitClick}>Submit</ButtonPrimary>
      </EditorWrapper>
    )
  }
}

export default ViewFork
