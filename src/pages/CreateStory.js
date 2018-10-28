import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Box } from 'grid-styled/emotion'

import Input, {
  Label, LabelConstraint,
} from '_system/Input'
import { TitleText } from '_system/Typography'
import { ButtonPrimary } from '_system/Button'
import { EditorWrapper } from 'Styled/Editor'
import TextEditor from 'Components/Papyrus/TextEditor'

@inject('storyEditorStore', 'userStore')
@observer
class CreateStory extends React.Component {
  componentDidMount() {
    const { storyEditorStore, history } = this.props

    const id = history.location.pathname.split('/').pop()

    if (id !== 'create') {
      storyEditorStore.loadStory(id)
      console.log(storyEditorStore.isForked)
    }

    if (!storyEditorStore.isValid()) {
      storyEditorStore.init()
    }
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

  getAuthorName = (firstName, lastName, userName) => {
    if (firstName != null && lastName != null) {
      return firstName + " " + lastName
    }
    return userName
  }

  getSerializedStoryContent = (som) => {
    const { storyEditorStore, userStore } = this.props
    console.log(som)
    storyEditorStore.changeContent(som)
    // return som
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

  render() {
    const { storyEditorStore } = this.props
    return (
      <EditorWrapper>
        <TitleText>Create a new Story</TitleText>
        <Label>Story Title</Label>
        <Box width={1 / 2}>
          <Input
            type="text"
            value={storyEditorStore.title}
            onChange={e => storyEditorStore.changeTitle(e.target.value)} />
        </Box>
        <Label>Story Description <LabelConstraint>Max 140 characters</LabelConstraint></Label>
        <Box width={3 / 4}>
          <Input
            type="text"
            maxLength="140"
            value={storyEditorStore.description}
            onChange={e => storyEditorStore.changeDesc(e.target.value)} />
        </Box>
        <Label>Content</Label>
        <TextEditor get={this.getSerializedStoryContent} />
        {storyEditorStore.isForked && storyEditorStore.storyId !== ''
          ? <>
            <ButtonPrimary type="button" onClick={this.handleUpdateClick}>Update</ButtonPrimary>
            <ButtonPrimary type="button" onClick={this.sendContributionRequest}>Send Contribution Request</ButtonPrimary>
          </>
          : ((storyEditorStore.saveInProgress
            && <ButtonPrimary type="button" onClick={(e) => { e.preventDefault() }}>Saving</ButtonPrimary>
          ),
          (!storyEditorStore.saveInProgress && storyEditorStore.storyId === ''
            ? <ButtonPrimary type="button" onClick={this.handleSubmitClick}>Submit</ButtonPrimary>
            : <ButtonPrimary type="button" onClick={this.handleUpdateClick}>Update</ButtonPrimary>
          ))
        }
      </EditorWrapper>
    )
  }
}

CreateStory.propTypes = {
  storyEditorStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default CreateStory
