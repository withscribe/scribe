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
class EditStory extends React.Component {
  state = {
    permission: false,
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
    })
  }

  componentWillUnmount() {
    // TODO: Fix this monkeypatch with an action using destroy()
    const { storyEditorStore } = this.props
    storyEditorStore.init()
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
    return (
      <EditorWrapper>
        <TitleText>{storyEditorStore.title}</TitleText>
        {storyEditorStore.content
          && <TextEditor content={storyEditorStore.content} get={this.serializedStoryUpdateCallback} />
        }
        <ButtonPrimary type="button" disabled={storyEditorStore.saveInProgress} onClick={this.handleUpdateClick}>
          {storyEditorStore.saveInProgress ? 'Saving' : 'Update'}
        </ButtonPrimary>
      </EditorWrapper>
    )
  }
}

export default EditStory
